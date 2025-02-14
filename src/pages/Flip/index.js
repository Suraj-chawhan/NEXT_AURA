"use client";

import React, { useState, useEffect } from "react";

const API_URL = "https://picsum.photos/v2/list?page=1&limit=8";

function FlipCardGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const images = data.map((img) => img.download_url);
        const shuffledCards = [...images, ...images].sort(
          () => Math.random() - 0.5
        );
        const formattedCards = shuffledCards.map((img, index) => ({
          id: index,
          image: img,
          flipped: false,
          matched: false,
        }));
        setCards(formattedCards);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].flipped) {
      const updatedCards = [...cards];
      updatedCards[index].flipped = true;
      setCards(updatedCards);
      setFlippedCards([...flippedCards, index]);

      if (flippedCards.length === 1) {
        setTimeout(() => checkMatch(index), 800);
      }
    }
  };

  const checkMatch = (index) => {
    const [firstIndex] = flippedCards;
    if (cards[firstIndex].image === cards[index].image) {
      setPoints(points + 10);
      setFlippedCards([]);
    } else {
      const updatedCards = [...cards];
      updatedCards[firstIndex].flipped = false;
      updatedCards[index].flipped = false;
      setCards(updatedCards);
      setFlippedCards([]);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-3">Flip the Card Game</h1>
      <p className="text-xl mb-4">Points: {points}</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-24 h-24 rounded-lg flex items-center justify-center cursor-pointer transition-transform ${
              card.flipped ? "bg-white" : "bg-gray-600"
            }`}
            onClick={() => handleCardClick(index)}
            style={{
              backgroundImage: card.flipped ? `url(${card.image})` : "none",
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default FlipCardGame;
