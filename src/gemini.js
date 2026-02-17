/**
 * gemini.js
 * Google Gemini AI API integration for Sheeva Assistant
 * @author Your Name
 * @version 1.0.0
 */

// Get API key from environment variable
const api_key = import.meta.env.VITE_GEMINI_API_KEY;

import { GoogleGenAI } from '@google/genai';

/**
 * Main function to send prompts to Gemini AI
 * @param {string} prompt - User input text
 * @returns {Promise<string>} - AI generated response
 */
async function main(prompt) {
    // Check if API key exists
    if (!api_key) {
        console.error("Gemini API key is missing. Please check your .env file.");
        return "API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
    }

    // Initialize Gemini AI client
    const ai = new GoogleGenAI({
        apiKey: api_key,
    });

    // Configure tools for AI (Google Search integration)
    const tools = [
        {
            googleSearch: {}
        },
    ];

    // AI model configuration
    const config = {
        thinkingConfig: {
            thinkingBudget: 0,
        },
        tools,
    };

    // Using Gemini Flash Lite for faster responses
    const model = 'gemini-flash-lite-latest';

    // Format the conversation content
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    try {
        // Generate content from AI
        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
}

export default main;