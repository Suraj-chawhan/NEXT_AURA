import React, { useState, useEffect } from "react";

const randomAnimalsNames = [
  "Aardvark",
  "Albatross",
  "Alligator",
  "Antelope",
  "Ape",
  "Baboon",
  "Bear",
  "Buffalo",
  "Camel",
  "Cat",
  "Cheetah",
  "Dog",
  "Dolphin",
  "Eagle",
  "Elephant",
  "Falcon",
  "Fox",
  "Giraffe",
  "Goat",
  "Horse",
  "Jaguar",
  "Kangaroo",
  "Leopard",
  "Lion",
  "Monkey",
  "Ostrich",
  "Otter",
  "Panda",
  "Penguin",
  "Rabbit",
  "Raccoon",
  "Shark",
  "Snake",
  "Tiger",
  "Turtle",
  "Whale",
  "Wolf",
  "Zebra",
];

const HangmanGame = () => {
  const [randomAnimalName, setRandomAnimalName] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [totalChances, setTotalChances] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    chooseRandomAnimalName();
  }, []);

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  const chooseRandomAnimalName = () => {
    const randomIndex = getRandomNumber(0, randomAnimalsNames.length);
    setRandomAnimalName(randomAnimalsNames[randomIndex].toUpperCase());
  };

  const handleLetterClick = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!randomAnimalName.includes(letter)) {
      setTotalChances((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (totalChances >= 10) {
      setGameStatus("lost");
    }

    if (randomAnimalName) {
      const uniqueLetters = new Set(randomAnimalName.replace(/\s+/g, ""));
      if (
        [...uniqueLetters].every((letter) => guessedLetters.includes(letter))
      ) {
        setGameStatus("won");
      }
    }
  }, [totalChances, guessedLetters, randomAnimalName]);

  const renderBlanks = () => {
    return (
      <div
        style={{ fontSize: "24px", letterSpacing: "5px", marginBottom: "10px" }}
      >
        {randomAnimalName.split("").map((letter, index) => (
          <span key={index}>
            {letter === " "
              ? " "
              : guessedLetters.includes(letter)
              ? letter
              : "_"}
          </span>
        ))}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "300px",
          gap: "5px",
        }}
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={
              guessedLetters.includes(letter) || gameStatus !== "playing"
            }
            style={{
              padding: "5px",
              fontSize: "16px",
              cursor: guessedLetters.includes(letter)
                ? "not-allowed"
                : "pointer",
              backgroundColor: guessedLetters.includes(letter)
                ? "#ddd"
                : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              width: "30px",
              height: "30px",
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setTotalChances(0);
    setGameStatus("playing");
    chooseRandomAnimalName();
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        marginTop: "20px",
      }}
    >
      <h1>Hangman Game</h1>
      {renderBlanks()}
      <div style={{ marginBottom: "15px" }}>{renderButtons()}</div>
      <p>
        Chances Left: <b>{10 - totalChances}</b>
      </p>
      {gameStatus !== "playing" && (
        <h2 style={{ color: gameStatus === "won" ? "green" : "red" }}>
          {gameStatus === "won" ? "🎉 You Won!" : "☹️ Game Over!"}
        </h2>
      )}
      <button
        onClick={restartGame}
        style={{
          padding: "10px",
          fontSize: "18px",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default HangmanGame;
