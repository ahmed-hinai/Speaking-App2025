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
  origin: true, // Allow any origin in development
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
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('audio');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/analyze', (req, res) => {
  console.log('=== ANALYZE REQUEST RECEIVED ===');
  
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: 'File upload failed: ' + err.message });
    }

    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    try {
      console.log('File received:', {
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // 1. TRANSCRIBE AUDIO
      console.log('Sending to Whisper...');
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      console.log('Transcription successful:', transcript.substring(0, 100) + '...');

      // Check if we got a meaningful transcript
      if (!transcript || transcript.trim().length < 10) {
        console.log('Transcript too short or empty');
        return res.json({
          transcript: transcript || 'No speech detected',
          feedback: "No clear speech was detected in your recording. Please ensure you're speaking clearly and try again with a longer recording."
        });
      }

      // 2. ANALYZE THE TRANSCRIPT
      console.log('Sending to GPT for analysis...');
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured feedback in this exact format:

GRAMMAR: [2-3 specific points about grammar]
PRONUNCIATION: [2-3 specific points about pronunciation]
FLUENCY: [2-3 specific points about fluency]
TASK COMPLETION: [Did they address the prompt?]
OVERALL: [Brief overall feedback and suggestions]

Keep it constructive and encouraging. Maximum 250 words.`
          },
          {
            role: 'user',
            content: `Please analyze this ESL student's speech and provide feedback. Here's their transcript: "${transcript}"`
          },
        ],
        max_tokens: 350,
        temperature: 0.7,
      });

      console.log('Analysis complete');
      
      res.json({ 
        transcript: transcript,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('=== ANALYSIS ERROR ===', error);
      
      let errorMessage = 'Error analyzing audio';
      let statusCode = 500;
      
      if (error.message.includes('multipart form')) {
        errorMessage = 'Audio format not supported. Please try recording again.';
        statusCode = 400;
      } else if (error.message.includes('API key')) {
        errorMessage = 'Server configuration error. Please check OpenAI API key.';
        statusCode = 500;
      } else if (error.response) {
        errorMessage = `OpenAI API error: ${error.response.data.error?.message || error.message}`;
        statusCode = 500;
      } else {
        errorMessage += `: ${error.message}`;
      }
      
      console.error('Final error to client:', errorMessage);
      res.status(statusCode).json({ 
        error: errorMessage
      });
    }
  });
});

// Health check with detailed info
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

// Test endpoint for file uploads
app.post('/test-upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        success: false,
        error: err.message 
      });
    }
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file received' 
      });
    }

    res.json({
      success: true,
      message: 'File upload test successful',
      fileInfo: {
        mimetype: req.file.mimetype,
        size: req.file.size,
        supported: ['wav', 'mp3', 'm4a', 'webm', 'ogg', 'mp4'].includes(req.file.mimetype.split('/')[1])
      }
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`=== SERVER STARTED ===`);
  console.log(`Server running on port ${port}`);
  console.log(`OpenAI API Key configured: ${!!process.env.OPENAI_API_KEY}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
