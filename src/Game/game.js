import React, { useState, useEffect, useRef } from "react";
import "./game.css";
import "./gameboard";
import {
  generateRandom,
  getEmptyBoard,
  checkGameOver,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
} from "./gameboard";
import { useSwipeable } from "react-swipeable";

const Game = () => {
  const [board, setBoard] = useState(null);
  const [point, setPoint] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [oldBoard, setOldBoard] = useState(null);
  const [oldPoint, setOldPoint] = useState(0);
  const gameFocus = useRef(null);

  const checkGame = () => {
    if (checkGameOver(board)) {
      setGameOver(true);
    }
  };

  const left = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveLeft(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
      }
    }
    checkGame();
  };

  const right = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveRight(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
      }
    }
    checkGame();
  };

  const up = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveUp(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
      }
    }
    checkGame();
  };

  const down = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveDown(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
      }
    }
    checkGame();
  };

  const buttonStyle = {
    height: "50px",
    width: "90px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    fontSize: "1rem",
    margin: "5px",
  };

  const onkeydown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      default:
    }
  };

  useEffect(() => {
    setBoard(generateRandom(getEmptyBoard()));
    setPoint(0);
    setGameOver(false);
    gameFocus.current.focus();
  }, []);

  const handler = useSwipeable({
    onSwipedLeft: left,
    onSwipedRight: right,
    onSwipedUp: up,
    onSwipedDown: down,
  });

  return (
    <div {...handler}>
      <h1
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          letterSpacing: "10px",
        }}
      >
        2048
      </h1>
      <div
        className="score"
        style={{
          width: "400px",
          backgroundColor: "black",
          color: "white",
          fontSize: "1rem",
          margin: "auto",
          transition: "all 0.5s",
        }}
      >
        <h1>Score: {point}</h1>
        <button
          onClick={() => {
            setBoard(oldBoard);
            setPoint(oldPoint);
            gameFocus.current.focus();
          }}
          style={{
            ...buttonStyle,
          }}
        >
          Undo
        </button>
      </div>
      <div
        className="game-over"
        style={{ display: gameOver ? "block" : "none" }}
      >
        <h1>Game Over</h1>
        <h2>Your Score: {point}</h2>
        <button
          onClick={() => {
            setBoard(generateRandom(getEmptyBoard()));
            setGameOver(false);
            setPoint(0);
          }}
          style={{
            ...buttonStyle,
          }}
        >
          New Game!
        </button>
      </div>
      <div
        className="game-container"
        style={{ display: gameOver ? "none" : "block" }}
        onKeyDown={(e) => {
          onkeydown(e);
        }}
        tabIndex="0"
        ref={gameFocus}
      >
        {board && !gameOver && (
          <>
            {board.map((row, i) => (
              <div key={i} className="row">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className="cell"
                    style={{
                      backgroundColor: cell === 0 ? "" : "#ffc97d",
                    }}
                  >
                    {cell === 0 ? "" : cell}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
