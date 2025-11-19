import express from "express";
import multer from "multer";
import cors from "cors";

import { OpenAI } from "openai"; // OpenAI SDK

const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); // This will allow all origins by default
// Set up multer for handling incoming audio files
const upload = multer();

// Set up OpenAI client
const client = new OpenAI({
  apiKey: "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" // Replace with your OpenAI API key
});

// Endpoint for analyzing the audio file
app.post("/analyze", upload.single("audio"), async (req, res) => {
  try {
    // Convert the uploaded file to base64
    const audioBase64 = req.file.buffer.toString("base64");

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an ESL speaking examiner." },
        { 
          role: "user", 
          content: `Analyze the following student's speech, and provide structured feedback based on grammar, pronunciation, fluency, and task completion. Return the feedback in a clear, readable format.` 
        },
        { role: "user", content: audioBase64 }
      ]
    });

    // Extract the feedback text from the response
    const feedback = response.choices[0].message.content;

    // Send back the feedback to the frontend
    res.json({ feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error analyzing audio." });
  }
});

app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

