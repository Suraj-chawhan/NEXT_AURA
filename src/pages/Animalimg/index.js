import Image from "next/image";
import React, { useState } from "react";

const animals = [
  { name: "dog", img: "/images/dog.jpg" },
  { name: "reindeer", img: "/images/reindeer.jpg" },
  { name: "cat", img: "/images/cat.jpg" },
  { name: "elephant", img: "/images/elephant.jpg" },
  { name: "giraffe", img: "/images/giraffe.jpg" },
  { name: "sloth", img: "/images/sloth.jpg" },
  { name: "lion", img: "/images/lion.jpg" },
  { name: "tiger", img: "/images/tiger.jpg" },
  { name: "monkey", img: "/images/monkey.jpg" },
  { name: "crocodile", img: "/images/crocodile.jpg" },
];

const getRandomAnimal = () =>
  animals[Math.floor(Math.random() * animals.length)];

const AnimalQuiz = () => {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState(getRandomAnimal);
  const [randomName, setRandomName] = useState(getRandomAnimal().name);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (isYes) => {
    const isCorrect = isYes === (currentAnimal.name === randomName);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

    setTimeout(() => {
      if (questionCount < 9) {
        const newAnimal = getRandomAnimal();
        setCurrentAnimal(newAnimal);
        setRandomName(getRandomAnimal().name);
        setFeedback("");
        setQuestionCount((prevCount) => prevCount + 1);
      } else {
        setFeedback(`Quiz Over! Your score: ${score + (isCorrect ? 1 : 0)}/10`);
      }
    }, 1000);
  };

  if (questionCount >= 10) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 text-white">
        <h1 className="text-3xl font-bold mb-4">Animal Quiz</h1>
        <p className="text-xl mt-2 font-bold">
          Quiz Over! Your final score: {score}/10
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 text-white">
      <h1 className="text-3xl font-bold mb-4">Animal Quiz</h1>
      <Image
        src={currentAnimal.img}
        alt={currentAnimal.name}
        width={10}
        height={10}
        className="w-64 h-64 object-cover rounded-lg shadow-lg"
      />
      <p className="text-xl mt-2">Is this a {randomName}?</p>
      <div className="mt-4">
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-500 text-white px-4 py-2 rounded m-2"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-500 text-white px-4 py-2 rounded m-2"
        >
          No
        </button>
      </div>
      <h2 className="text-2xl font-bold mt-4">Score: {score}</h2>
      {feedback && <p className="text-xl mt-2 font-bold">{feedback}</p>}
    </div>
  );
};

export default AnimalQuiz;
