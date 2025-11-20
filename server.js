import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: '*', // Allow all origins for now
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Add body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('audio');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/analyze', (req, res) => {
  console.log('Received analyze request');
  
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: 'File upload failed: ' + err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    try {
      console.log('Processing file:', {
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // 1. TRANSCRIBE AUDIO - Simplified approach without custom boundaries
      console.log('Sending to Whisper...');
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      console.log('Transcription successful, length:', transcript.length);

      // 2. ANALYZE THE TRANSCRIPT
      console.log('Sending to GPT for analysis...');
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured feedback in this format:
            
Grammar: [feedback]
Pronunciation: [feedback] 
Fluency: [feedback]
Task Completion: [feedback]
Overall: [overall feedback]

Keep it constructive and encouraging. Focus on specific improvements the student can make.`
          },
          {
            role: 'user',
            content: `Please analyze this student's speech transcript and provide feedback:\n\n"${transcript}"`
          },
        ],
        max_tokens: 500,
      });

      console.log('Analysis complete');
      
      res.json({ 
        transcript: transcript,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      
      let errorMessage = 'Error analyzing audio: ' + (error.message || 'Unknown error');
      
      if (error.response) {
        console.error('OpenAI API error details:', error.response.data);
        errorMessage += ` - OpenAI Error: ${JSON.stringify(error.response.data)}`;
      }
      
      res.status(500).json({ 
        error: errorMessage
      });
    }
  });
});

// Health check with more info
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    endpoints: ['POST /analyze']
  });
});

// Debug endpoint
app.post('/debug-upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' });
    }

    res.json({
      success: true,
      fileInfo: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bufferLength: req.file.buffer.length
      }
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Make sure OPENAI_API_KEY is set correctly');
});