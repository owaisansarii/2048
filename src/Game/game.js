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
  checkWin,
} from "./gameboard";
import { useSwipeable } from "react-swipeable";

const Game = () => {
  const [board, setBoard] = useState(null);
  const [point, setPoint] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [oldBoard, setOldBoard] = useState(null);
  const [oldPoint, setOldPoint] = useState(0);
  const [win, setWin] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [touch, setTouch] = useState(false);
  const gameFocus = useRef(null);

  const checkGame = () => {
    if (checkGameOver(board)) {
      setGameOver(true);
      if (point > highScore) {
        setHighScore(point);
        saveHighScore(point);
      }
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
        if (point > highScore) {
          setHighScore(point);
          saveHighScore(point);
        }
      }
    }
    checkGame();
    if (checkWin(board)) {
      setWin(true);
    }
  };

  const right = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveRight(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
        if (point + score > highScore) {
          setHighScore(point + score);
          saveHighScore(point + score);
        }
      }
    }
    checkGame();
    if (checkWin(board)) {
      setWin(true);
    }
  };

  const up = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveUp(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
        if (point > highScore) {
          setHighScore(point);
          saveHighScore(point);
        }
      }
    }
    checkGame();
    if (checkWin(board)) {
      setWin(true);
    }
  };

  const down = () => {
    setOldBoard(board);
    setOldPoint(point);
    const [newBoard, changed, score] = moveDown(board);
    if (changed) {
      setBoard(generateRandom(newBoard));
      if (score) {
        setPoint(point + score);
        if (point > highScore) {
          setHighScore(point);
          saveHighScore(point);
        }
      }
    }
    checkGame();
    if (checkWin(board)) {
      setWin(true);
    }
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

  const cell_color = {
    2: "f0f6f6",
    4: "d1e4e5",
    8: "b3d0d1",
    16: "a4c9cb",
    32: "adc3c4",
    64: "b5bcbc",
    128: "bdb5b5",
    256: "c3afae",
    512: "c9a8a7",
    1024: "cfa1a0",
    2048: "b88b8a",
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
  const isTouchDevice = () => {
    let touchDevice = "ontouchstart" in window || navigator.maxTouchPoints;
    if (touchDevice) {
      setTouch(true);
    }
  };

  const getHighScore = () => {
    if (localStorage.getItem("highScore")) {
      setHighScore(localStorage.getItem("highScore"));
    } else {
      localStorage.setItem("highScore", 0);
      setHighScore(0);
    }
  };

  const saveHighScore = () => {
    localStorage.setItem("highScore", highScore);
  };

  useEffect(() => {
    setBoard(generateRandom(getEmptyBoard()));
    setPoint(0);
    setGameOver(false);
    if (isTouchDevice()) {
      setTouch(true);
    }
    getHighScore();
    gameFocus.current.focus();
  }, []);

  const handler = useSwipeable({
    onSwipedLeft: left,
    onSwipedRight: right,
    onSwipedUp: up,
    onSwipedDown: down,
  });

  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div {...handler} style={{ touchAction: "pan-x" }}>
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
        <h3>
          <p>Score: {point}</p> <p>High-Score: {highScore}</p>
        </h3>
        <button
          onClick={() => {
            setBoard(oldBoard);
            setPoint(oldPoint);
            setGameOver(false);
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
        style={{ display: gameOver || win ? "block" : "none" }}
      >
        <h1>{win ? "Yay! You won" : "Game Over"}</h1>
        <h2>Your Score: {point}</h2>
        <button
          onClick={() => {
            setBoard(generateRandom(getEmptyBoard()));
            setGameOver(false);
            setWin(false);
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
          preventDefault(e);
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
                      backgroundColor: cell === 0 ? "" : "#" + cell_color[cell],
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
      <div
        className="HowToPlay"
        style={{
          backgroundColor: "black",
          color: "white",
          letterSpacing: "2px",
          width: "400px",
          margin: "auto",
          marginTop: "20px",
          borderRadius: "5px",
          transition: "all 0.5s",
        }}
      >
        <p>
          <b>HOW TO PLAY:</b>{" "}
          {touch ? "Swipe Up,Down,Left or right" : "Use your arrow keys"} to
          move the tiles. Tiles with the same number merge into one when they
          touch. Add them up to reach 2048!
        </p>
      </div>
    </div>
  );
};

export default Game;
