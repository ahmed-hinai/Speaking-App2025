import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
}));

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept all audio mime types
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
}).single('audio');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/analyze', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: 'File upload failed: ' + err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    try {
      console.log('Received file:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // SIMPLIFIED APPROACH - Send buffer directly to OpenAI
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer, // Send the buffer directly
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      console.log('Transcription successful. Text length:', transcript.length);

      // ANALYZE THE TRANSCRIPT WITH GPT
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured feedback in the following format:
            
Grammar: [feedback on grammar]
Pronunciation: [feedback on pronunciation] 
Fluency: [feedback on fluency]
Task Completion: [feedback on task completion]
Overall: [overall feedback and suggestions]

Keep it constructive and encouraging. Focus on specific improvements the student can make.`
          },
          {
            role: 'user',
            content: `Please analyze this student's speech transcript and provide feedback:\n\n"${transcript}"`
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      res.json({ 
        transcript: transcript,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('OpenAI API response error:', error.response.data);
        console.error('OpenAI API status:', error.response.status);
      }
      
      res.status(500).json({ 
        error: 'Error analyzing audio: ' + (error.message || 'Unknown error'),
        details: error.response?.data || 'No additional details'
      });
    }
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Debug endpoint to test file uploads
app.post('/debug-upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' });
    }

    res.json({
      received: true,
      fileInfo: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bufferLength: req.file.buffer.length
      },
      message: 'File received successfully - this confirms multer is working'
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Make sure OPENAI_API_KEY is set in your environment variables');
});
