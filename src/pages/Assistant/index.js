"use client";

import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect, useRef } from "react";
import Model from "../../../public/Suraj"; // Ensure this path is correct based on your structure
import { Html, Stars } from "@react-three/drei";

import io from "socket.io-client";
import Model1 from "../../../public/Space";

const SERVER_URL = "https://websocket-jarvis-eyif.onrender.com";
const PAUSE_THRESHOLD = 1500;

function Assistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [socket, setSocket] = useState(null);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastSpokenTextRef = useRef(""); // To track last spoken response

  useEffect(() => {
    const socketConnection = io(SERVER_URL);
    setSocket(socketConnection);

    socketConnection.on("connect", () => console.log("Connected to server"));
    socketConnection.on("ans", handleSpeechResponse);
    socketConnection.on("connect_error", (error) =>
      console.error("WebSocket Error:", error)
    );
    socketConnection.on("disconnect", () =>
      console.log("WebSocket Disconnected")
    );

    return () => socketConnection.disconnect();
  }, []);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => console.log("Speech recognition started...");
      recognition.onresult = handleSpeechResult;
      recognition.onerror = (event) =>
        console.error("Speech Recognition Error:", event.error);
      recognition.onend = () => {
        console.log("Speech recognition stopped.");
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support Speech Recognition.");
    }
  }, [socket, handleSpeechResult]);

  const handleSpeechResponse = (response) => {
    console.log("Server response:", response);

    // Prevent speaking again if the response is the same
    if (lastSpokenTextRef.current === response) return;
    lastSpokenTextRef.current = response;

    const speech = new SpeechSynthesisUtterance(response);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  const handleSpeechResult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        const finalText = event.results[i][0].transcript.trim();
        socket.emit("message", finalText);
        setFinalTranscript(finalText);
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    setTranscript(interimTranscript);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (interimTranscript.trim()) {
        socket.emit("message", interimTranscript.trim());
        setFinalTranscript(interimTranscript.trim());
      }
    }, PAUSE_THRESHOLD);
  };

  const toggleListening = () => {
    if (!isListening) {
      recognitionRef.current?.start();
      setIsListening(true);
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="justify-center w-full h-screen flex flex-col bg-black-900 items-center">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={toggleListening}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      <Canvas className="w-full h-[80%] bg-black mt-5">
        <ambientLight intensity={4} color="#ffffff" />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />

        <Model isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}

export default Assistant;
