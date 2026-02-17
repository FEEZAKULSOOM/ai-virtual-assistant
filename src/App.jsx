/**
 * App.jsx
 * Main application component for Sheeva AI Assistant
 * @author Your Name
 * @version 1.0.0
 */

import React, { useContext } from 'react'
import "./App.css";
import va from './assets/ai.png';
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/UserContext';
import speakImg from './assets/speak.gif';
import aiVoiceImg from './assets/voice.gif';

function App() {
  // Destructure context values from UserContext
  let { recognition, speaking, setResponse, setSpeaking, prompt, setPrompt, response } = useContext(dataContext);

  return (
    <div className='main'>
      {/* Vertical glowing lines background effect */}
      <div className="vertical-lines">
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
      </div>

      {/* AI Avatar Image */}
      <img src={va} alt="Sheeva AI Assistant Avatar" id="ai" />

      {/* Assistant Title */}
      <span>I'm Sheeva, Your Advanced Virtual Assistant</span>

      {/* Conditional rendering: Show button or response based on speaking state */}
      {
        !speaking ? (
          /* Microphone button - shown when not speaking */
          <button onClick={() => {
            setPrompt("listening...");
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}>
            Click here <CiMicrophoneOn />
          </button>
        ) : (
          /* Response area - shown when speaking */
          <div className='response'>
            {
              /* Show listening animation or AI response animation */
              !response ?
                <img src={speakImg} alt="Listening animation" id="speakImg" /> :
                <img src={aiVoiceImg} alt="AI speaking animation" id="aiVoiceImg" />
            }
            {/* Display the current prompt/response text */}
            <p>{prompt}</p>
          </div>
        )
      }
    </div>
  )
}

export default App;