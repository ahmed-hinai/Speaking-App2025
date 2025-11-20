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
  origin: '*',
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
  limits: { fileSize: 5 * 1024 * 1024 }, // Reduce to 5MB for faster processing
}).single('audio');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 second timeout for OpenAI requests
});

app.post('/analyze', (req, res) => {
  console.log('Received analyze request');
  
  // Set a longer timeout for this route (90 seconds)
  req.setTimeout(90000);
  
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

      // 1. TRANSCRIBE AUDIO - with shorter audio option
      console.log('Sending to Whisper...');
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      console.log('Transcription successful, length:', transcript.length);

      // If transcript is too short, provide immediate feedback
      if (transcript.length < 10) {
        return res.json({
          transcript: transcript,
          feedback: "Your recording was too short to analyze properly. Please try again with a longer recording (at least 10-15 seconds)."
        });
      }

      // 2. ANALYZE THE TRANSCRIPT - Use GPT-3.5-turbo for faster response
      console.log('Sending to GPT for analysis...');
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-3.5-turbo", // Faster than GPT-4
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured but CONCISE feedback in this format (max 300 words):

GRAMMAR: [2-3 sentences about grammar]
PRONUNCIATION: [2-3 sentences about pronunciation] 
FLUENCY: [2-3 sentences about fluency]
TASK COMPLETION: [2-3 sentences about task completion]
OVERALL: [2-3 sentences overall feedback]

Keep it constructive, encouraging, and focused on specific improvements.`
          },
          {
            role: 'user',
            content: `Please analyze this student's speech transcript and provide CONCISE feedback:\n\n"${transcript}"`
          },
        ],
        max_tokens: 400, // Reduced from 500
        temperature: 0.7,
      });

      console.log('Analysis complete');
      
      res.json({ 
        transcript: transcript,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      
      let errorMessage = 'Error analyzing audio: ' + (error.message || 'Unknown error');
      
      if (error.code === 'TIMEOUT') {
        errorMessage = 'Analysis timed out. Please try a shorter recording.';
      }
      
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

// Quick analysis endpoint with shorter processing
app.post('/analyze-quick', (req, res) => {
  console.log('Received quick analyze request');
  
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: 'File upload failed: ' + err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    try {
      console.log('Quick analysis - Processing file:', {
        size: req.file.size
      });

      // Limit file size for quick analysis
      if (req.file.size > 2 * 1024 * 1024) { // 2MB max
        return res.status(400).json({ error: 'File too large for quick analysis. Please use a shorter recording.' });
      }

      // 1. TRANSCRIBE AUDIO
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      // 2. QUICK ANALYSIS with GPT-3.5-turbo
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: 'system', 
            content: `Provide brief ESL feedback (under 150 words) focusing on the most important improvements needed. Format: Grammar: ... Pronunciation: ... Fluency: ... Overall: ...`
          },
          {
            role: 'user',
            content: `Brief feedback on: "${transcript.substring(0, 500)}"` // Limit transcript length
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      res.json({ 
        transcript: transcript.substring(0, 500) + (transcript.length > 500 ? '...' : ''),
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Quick analysis error:', error);
      res.status(500).json({ 
        error: 'Quick analysis failed: ' + (error.message || 'Unknown error')
      });
    }
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    endpoints: ['POST /analyze', 'POST /analyze-quick']
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
        mimetype: req.file.mimetype,
        size: req.file.size,
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});