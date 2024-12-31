// server.mjs
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module fixes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Verify API key is present
if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in .env file');
    process.exit(1);
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/get-hint', async (req, res) => {
    const { questionName } = req.body;
    console.log('Received Question Name:', questionName);

    if (!questionName) {
        return res.status(400).json({ error: 'No question name provided' });
    }

    try {
        // Format question name
        const formattedQuestion = questionName.split('-').join(' ');
        
        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate content
        const prompt = `Give a concise hint for solving the LeetCode question in 6 words "${formattedQuestion}". 
                       hint should be a very short line and should not be complete intiution or answer.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Successfully generated hint:', text);
        res.json({ hint: text });
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ 
            error: 'Error generating hint', 
            details: error.message 
        });
    }
});

// Add a basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});