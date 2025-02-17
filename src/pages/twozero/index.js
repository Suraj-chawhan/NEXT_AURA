import { useState, useEffect } from "react";

const App = () => {
  const [board, setBoard] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(null);

  const initBoard = () => {
    let newBoard = Array(4)
      .fill()
      .map(() => Array(4).fill(0));
    newBoard = placeRandom(placeRandom(newBoard));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setMessage(null);
  };

  const getBlankCoordinates = (board) => {
    const blankCoordinates = [];
    board.forEach((row, r) =>
      row.forEach((cell, c) => cell === 0 && blankCoordinates.push([r, c]))
    );
    return blankCoordinates;
  };

  const randomStartingNumber = () => (Math.random() < 0.9 ? 2 : 4);

  const placeRandom = (board) => {
    const blankCoordinates = getBlankCoordinates(board);
    if (blankCoordinates.length === 0) return board;
    const [r, c] =
      blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    board[r][c] = randomStartingNumber();
    return board;
  };

  const boardMoved = (original, updated) =>
    JSON.stringify(updated) !== JSON.stringify(original);

  const move = (direction) => {
    if (gameOver) return setMessage("Game over. Please start a new game.");

    const moves = {
      up: moveUp,
      right: moveRight,
      down: moveDown,
      left: moveLeft,
    };
    if (!moves[direction]) return;

    const { board: movedBoard, score: moveScore } = moves[direction](board);
    if (boardMoved(board, movedBoard)) {
      const boardWithRandom = placeRandom(movedBoard);
      setBoard(boardWithRandom);
      setScore(score + moveScore);
      if (checkForGameOver(boardWithRandom)) {
        setGameOver(true);
        setMessage("Game over!");
      }
    }
  };

  const moveUp = (inputBoard) => {
    const rotated = rotateRight(inputBoard);
    const { board, score } = slideLeft(rotated);
    return { board: rotateLeft(board), score };
  };

  const moveRight = (inputBoard) => slideRight(inputBoard);

  const moveDown = (inputBoard) => {
    const rotated = rotateRight(inputBoard);
    const { board, score } = slideRight(rotated);
    return { board: rotateLeft(board), score };
  };

  const moveLeft = (inputBoard) => slideLeft(inputBoard);

  const slideLeft = (inputBoard) => {
    let board = inputBoard.map((row) => {
      let newRow = row.filter((val) => val);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow.splice(i + 1, 1);
          newRow.push(0);
        }
      }
      return [...newRow, ...Array(4 - newRow.length).fill(0)];
    });
    return { board, score: board.flat().reduce((sum, val) => sum + val, 0) };
  };

  const slideRight = (inputBoard) => {
    let board = inputBoard.map((row) => row.reverse());
    let { board: newBoard, score } = slideLeft(board);
    return { board: newBoard.map((row) => row.reverse()), score };
  };

  const rotateRight = (matrix) =>
    matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
  const rotateLeft = (matrix) =>
    matrix[0].map((_, i) => matrix.map((row) => row[i])).reverse();

  const checkForGameOver = (board) =>
    [moveUp, moveRight, moveDown, moveLeft].every(
      (fn) => !boardMoved(board, fn(board).board)
    );

  const handleKeyDown = (e) => {
    const keys = { 38: "up", 39: "right", 40: "down", 37: "left", 78: "new" };
    if (keys[e.keyCode])
      keys[e.keyCode] === "new" ? initBoard() : move(keys[e.keyCode]);
  };

  useEffect(() => {
    initBoard();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <h1>2048 Game</h1>
      <p>Score: {score}</p>
      {message && <p>{message}</p>}
      <button onClick={initBoard}>New Game</button>
      <div>
        {board &&
          board.map((row, i) => (
            <div key={i} style={{ display: "flex" }}>
              {row.map((cell, j) => (
                <div
                  key={j}
                  style={{
                    width: 50,
                    height: 50,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cell !== 0 && cell}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
