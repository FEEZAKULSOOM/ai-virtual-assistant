/**
 * UserContext.jsx
 * Context provider for Sheeva AI Assistant state management
 * Handles speech recognition, synthesis, and AI responses
 * @author Your Name
 * @version 1.0.0
 */

import React, { createContext, useState } from "react";
import main from "../gemini";

// Create context for sharing state across components
export const dataContext = createContext();

/**
 * UserContext Provider Component
 * Manages all voice interaction state and logic
 */
function UserContext({ children }) {
    // State management
    const [speaking, setSpeaking] = useState(false);
    const [prompt, setPrompt] = useState("listening...");
    const [response, setResponse] = useState(false);

    /**
     * Text-to-speech function
     * @param {string} text - Text to be spoken
     */
    function speak(text) {
        let textSpeak = new SpeechSynthesisUtterance(text);
        textSpeak.volume = 1;
        textSpeak.rate = 1;
        textSpeak.pitch = 1;
        textSpeak.lang = "hi-US";

        // Reset states when speech ends
        textSpeak.onend = () => {
            setSpeaking(false);
            setResponse(false);
            setPrompt("listening...");
        };

        // Handle speech errors
        textSpeak.onerror = () => {
            setSpeaking(false);
            setResponse(false);
            setPrompt("listening...");

        };

        window.speechSynthesis.speak(textSpeak);
    }

    /**
     * Get AI response from Gemini
     * @param {string} prompt - User query
     */
    async function aiResponse(prompt) {
        let text = await main(prompt);
        let newText = text
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/google/gi, "Fiza Farid");

        const maxChars = 200;
        const displayText = newText.length > maxChars ? newText.slice(0, maxChars) + "..." : newText;

        setPrompt(displayText);
        setResponse(true);
        speak(displayText);
    }

    // Initialize speech recognition
    let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

    // Handle speech recognition results
    recognition.onresult = ((e) => {
        let currIndex = e.resultIndex;
        let transcript = e.results[currIndex][0].transcript;
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    });

    recognition.onend = () => {
        // Let speak function handle state reset
    };

    // Context value to be provided
    let value = {
        recognition, speaking, setSpeaking,
        prompt, setPrompt, response, setResponse
    }

    /**
     * Process voice commands
     * @param {string} command - Recognized speech
     */
    function takeCommand(command) {
        // Website opening commands
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank");
            setResponse(true);
            setPrompt("opening Youtube");
            speak("opening youtube");
        }
        else if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank");
            setResponse(true);
            setPrompt("opening google");
            speak("opening google");
        }
        else if (command.includes("open") && command.includes("instagram")) {
            window.open("https://www.instagram.com/", "_blank");
            setResponse(true);
            setPrompt("opening instagram");
            speak("opening instagram");
        }
        else if (command.includes("open") && command.includes("whatsapp")) {
            window.open("https://www.whatsapp.com/", "_blank");
            setResponse(true);
            setPrompt("opening whatsapp");
            speak("opening whatsapp");
        }
        else if (command.includes("who are you") || command.includes("what is your name")) {
            setResponse(true);
            setPrompt("I am Sheeva  a  large language model trained by fiza farid");
            speak("I am Sheeva large language model trained by fiza farid");
        }
        else if (command.includes("open") && command.includes("facebook")) {
            window.open("https://www.facebook.com/", "_blank");
            setResponse(true);
            setPrompt("opening facebook");
            speak("opening facebook");
        }
        else if (command.includes("open") && (command.includes("linkeden") || command.includes("linkedin"))) {
            window.open("https://pk.linkedin.com/", "_blank");
            setResponse(true);
            setPrompt("opening linkden");
            speak("opening linkden");
        }
        else if (command.includes("open") && command.includes("twitter")) {
            window.open("https://twitter.com/", "_blank");
            setResponse(true);
            setPrompt("opening twitter");
            speak("opening twitter");
        }
        // Time and date commands
        else if (command.includes("time")) {
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            setPrompt(`${time}`);
            setResponse(true);
            speak(`${time}`);
        }
        else if (command.includes("date")) {
            let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
            setPrompt(`${date}`);
            setResponse(true);
            speak(`${date}`);
        }
        // Default to AI response
        else {
            aiResponse(command);
        }
    }

    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext;