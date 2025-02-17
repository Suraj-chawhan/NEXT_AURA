import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Cylinder, Text, Html } from "@react-three/drei";
import Model from "../../../public/Dora";

export default function Game() {
  const [position, setPosition] = useState([0, 1, 0]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const lanePositions = [-4, 0, 4];

  useEffect(() => {
    if (gameOver) return; // Prevent movement when game is over

    const handleKeyDown = (event) => {
      let currentIndex = lanePositions.indexOf(position[0]);
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        setPosition([lanePositions[currentIndex - 1], 1, 0]);
      }
      if (
        event.key === "ArrowRight" &&
        currentIndex < lanePositions.length - 1
      ) {
        setPosition([lanePositions[currentIndex + 1], 1, 0]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position, gameOver, lanePositions]);

  const restartGame = () => {
    setScore(0);
    setPosition([0, 1, 0]); // Reset the cylinder to the starting lane (center)
    setGameOver(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "white",
        position: "relative",
      }}
    >
      {/* Score display at the top */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "24px",
          fontWeight: "bold",
          zIndex: 1,
        }}
      >
        Score: {score}
      </div>

      <Canvas camera={{ position: [0, 5, 10] }}>
        <fog attach="fog" args={["white", 10, 50]} />
        <GameScene
          position={position}
          setScore={setScore}
          score={score}
          setGameOver={setGameOver}
          gameOver={gameOver}
        />
        {gameOver && (
          // Game Over overlay using Drei’s Html component
          <Html center>
            <div
              style={{
                background: "rgba(0,0,0,0.8)",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                color: "white",
              }}
            >
              <h1>Game Over</h1>
              <p>Final Score: {score}</p>
              <button
                onClick={restartGame}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Restart
              </button>
            </div>
          </Html>
        )}
      </Canvas>
    </div>
  );
}

function GameScene({ position, setScore, score, setGameOver, gameOver }) {
  const obstaclesRef = useRef([]);
  const cubesRef = useRef([]);
  const lanePositions = [-4, 0, 4];

  // Generate letters (point increasers)
  const [letters, setLetters] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      letter: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      lane: lanePositions[Math.floor(Math.random() * 3)],
      z: -i * 20 - 10,
      visible: true,
    }))
  );

  // Generate cubes (game-ending obstacles)
  const [cubes, setCubes] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      lane: lanePositions[Math.floor(Math.random() * 3)],
      z: -i * 50 - 30,
    }))
  );

  useFrame(() => {
    if (gameOver) return; // Stop updates when game is over

    // Update letters
    obstaclesRef.current.forEach((obstacle, index) => {
      if (!obstacle) return;
      obstacle.position.z += 0.2;

      // Collision detection with letter (point increaser)
      if (
        Math.abs(obstacle.position.z - position[2]) < 1.5 &&
        obstacle.position.x === position[0] &&
        !obstacle.userData.hit
      ) {
        setScore((prev) => prev + 1);
        obstacle.userData.hit = true;
        // Make letter disappear on collision
        setLetters((prev) =>
          prev.map((l, i) => (i === index ? { ...l, visible: false } : l))
        );
      }

      // Reset letter when it moves past the camera
      if (obstacle.position.z > 10) {
        const newZ = -Math.random() * 50 - 10;
        obstaclesRef.current[index].position.set(letters[index].lane, 3, newZ);
        obstaclesRef.current[index].userData.hit = false;
        setLetters((prev) =>
          prev.map((l, i) =>
            i === index ? { ...l, z: newZ, visible: true } : l
          )
        );
      }
    });

    // Update cubes (game-ending obstacles)
    cubesRef.current.forEach((cube, index) => {
      if (!cube) return;
      cube.position.z += 0.2;

      // Collision detection with cube
      if (
        Math.abs(cube.position.z - position[2]) < 1.5 &&
        cube.position.x === position[0]
      ) {
        setGameOver(true);
      }

      // Reset cube when it moves past the camera
      if (cube.position.z > 10) {
        const newZ = -Math.random() * 50 - 30;
        cubesRef.current[index].position.set(cubes[index].lane, 1, newZ);
      }
    });
  });

  return (
    <>
      {/* Infinite track */}
      <Box args={[12, 1, 2000]} position={[0, 0, -50]} material-color="gray" />
      {/* Player (cylinder) */}

      <ambientLight intensity={4} />
      <Model position={position} />
      {/* Render letters */}
      {letters.map((item, index) =>
        item.visible ? (
          <Text
            key={index}
            ref={(el) => {
              if (el) {
                el.userData = { hit: false };
                obstaclesRef.current[index] = el;
              }
            }}
            position={[item.lane, 3, item.z]} // Y set to 3 so letter is above ground
            fontSize={2}
            color="black"
          >
            {item.letter}
          </Text>
        ) : null
      )}
      {/* Render cubes */}
      {cubes.map((item, index) => (
        <Box
          key={`cube-${index}`}
          ref={(el) => {
            if (el) cubesRef.current[index] = el;
          }}
          args={[2, 2, 2]}
          position={[item.lane, 1, item.z]}
          material-color="blue"
        />
      ))}
    </>
  );
}
