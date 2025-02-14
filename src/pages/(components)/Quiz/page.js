"use client";

import React, { useState, useEffect } from "react";

const API_URL = "https://the-trivia-api.com/api/questions?limit=5";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.map((q) => ({
          question: q.question,
          options: [...q.incorrectAnswers, q.correctAnswer].sort(
            () => Math.random() - 0.5
          ),
          answer: q.correctAnswer,
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load questions. Try again later.");
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (clickedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setClickedOption(null);
    setShowResult(false);
  };

  if (loading)
    return <div className="text-center text-xl font-bold">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
      <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Quiz App</h1>
        {showResult ? (
          <div className="text-center">
            <p className="text-xl font-semibold">
              Your Score: {score} / {questions.length}
            </p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={resetQuiz}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-lg font-semibold">
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </p>
            </div>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  className={`p-2 rounded border ${
                    clickedOption === option
                      ? "bg-blue-400 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setClickedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
              onClick={handleNext}
              disabled={!clickedOption}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
