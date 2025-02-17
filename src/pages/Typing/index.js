import React, { useState, useEffect } from "react";

const TypingMaster = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // The A to Z alphabet
  const [gameData, setGameData] = useState(""); // Store the random letters to type
  const [inputText, setInputText] = useState(""); // Store text typed by user
  const [startTime, setStartTime] = useState(null); // Timer start
  const [endTime, setEndTime] = useState(null); // Timer end
  const [speed, setSpeed] = useState(0); // Typing speed in words per minute
  const [accuracy, setAccuracy] = useState(100); // Typing accuracy
  const [isTyping, setIsTyping] = useState(false); // Check if typing started
  const [showResults, setShowResults] = useState(false); // Show results after submission

  // Randomly generate a string of random letters (A-Z)
  const generateRandomText = (length = 50) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return result;
  };

  // Initialize the game and generate random letters
  useEffect(() => {
    const randomText = generateRandomText();
    setGameData(randomText); // Set the random letters
  }, []);

  // Handle the typing input and calculate accuracy dynamically
  const handleTyping = (event) => {
    const typedText = event.target.value;
    setInputText(typedText);

    // Start tracking time when the user starts typing
    if (!isTyping && typedText.length > 0) {
      setIsTyping(true);
      setStartTime(Date.now());
    }
  };

  // Handle the submission of the game
  const handleSubmit = () => {
    setEndTime(Date.now());

    // Speed calculation
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordCount = gameData.length / 5; // Considering average word length as 5 characters
    const calculatedSpeed = Math.round(wordCount / timeInMinutes);
    setSpeed(calculatedSpeed);

    // Accuracy calculation
    const correctChars = inputText
      .split("")
      .filter((char, index) => char === gameData[index]).length;
    const calculatedAccuracy = (correctChars / inputText.length) * 100;
    setAccuracy(calculatedAccuracy);

    // Show results
    setShowResults(true);
  };

  return (
    <div className="flex justify-between relative">
      <div className="flex items-center justify-center">
        <img src="/Animated/boy.gif" className="h-60" alt="" />
      </div>

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Typing Master (A-Z)
          </h2>
          <div className="text-lg text-gray-600 mb-4">
            <p>
              Type the random letters below as quickly and accurately as
              possible:
            </p>
          </div>

          {/* Game Text */}
          <div className="bg-gray-200 p-4 rounded-md mb-6">
            <p className="text-gray-700 font-mono">{gameData}</p>
          </div>

          {/* User Input */}
          <input
            type="text"
            value={inputText}
            onChange={handleTyping}
            placeholder="Start typing here..."
            className="w-full p-3 border rounded-md mb-6 text-lg text-black"
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>

          {/* Display Speed and Accuracy after submission */}
          {showResults && (
            <div className="mt-6">
              <p className="text-gray-600">Speed: {speed} WPM</p>
              <p className="text-gray-600">Accuracy: {accuracy.toFixed(2)}%</p>
            </div>
          )}

          {/* Restart Game Button */}
          {showResults && (
            <button
              onClick={() => window.location.reload()} // Reload the page to restart the game
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Restart Game
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src="/Animated/boy.gif" className="h-60" alt="" />
      </div>
    </div>
  );
};

export default TypingMaster;
