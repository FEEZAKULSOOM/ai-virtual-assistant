/**
 * gemini.js
 * Google Gemini AI API integration for Sheeva Assistant
 * @author Your Name
 * @version 1.0.0
 */

// Gemini API Key - Replace with your own key
let api_key = "AIzaSyDdae8eLiDSvNji_Wa8GtNyv5xpLKCHl_Y";

import { GoogleGenAI } from '@google/genai';

/**
 * Main function to send prompts to Gemini AI
 * @param {string} prompt - User input text
 * @returns {Promise<string>} - AI generated response
 */
async function main(prompt) {
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

    // Generate content from AI
    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    return response.text;
}

export default main;