export const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// export let score = 0;

const hasValue = (board, value) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === value) {
        return true;
      }
    }
  }
  return false;
};

export const isFull = (board) => {
  return !hasValue(board, 0);
};

const getRandomPosition = (board) => {
  let x = Math.floor(Math.random() * board.length);
  let y = Math.floor(Math.random() * board[x].length);
  return [x, y];
};

export const generateRandom = (board) => {
  if (isFull(board)) {
    return board;
  }
  let [x, y] = getRandomPosition(board);
  while (board[x][y] !== 0) {
    [x, y] = getRandomPosition(board);
  }
  board[x][y] = Math.random() > 0.5 ? 2 : 4;
  return board;
};

const compress = (board) => {
  let changed = false;
  let newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    let colIndex = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        newBoard[i][colIndex] = board[i][j];
        if (j !== colIndex) {
          changed = true;
        }
        colIndex++;
      }
    }
  }
  return [newBoard, changed];
};

const merge = (board) => {
  let changed = false;
  let score = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
        board[i][j] = board[i][j] * 2;
        board[i][j + 1] = 0;
        changed = true;
        score = board[i][j];
      }
    }
  }
  return [board, changed, score];
};

const reverse = (board) => {
  let newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      newBoard[i][j] = board[i][3 - j];
    }
  }
  return newBoard;
};

const transpose = (board) => {
  let newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      newBoard[j][i] = board[i][j];
    }
  }
  return newBoard;
};

export const moveLeft = (board) => {
  let changed2, score;
  let [newBoard, changed1] = compress(board);
  [newBoard, changed2, score] = merge(newBoard);
  let changed = changed1 || changed2;
  [newBoard] = compress(newBoard);
  return [newBoard, changed, score];
};

export const moveRight = (board) => {
  let changed, score;
  let newBoard = reverse(board);
  [newBoard, changed, score] = moveLeft(newBoard);
  newBoard = reverse(newBoard);
  return [newBoard, changed, score];
};

export const moveUp = (board) => {
  let changed, score;
  let newBoard = transpose(board);
  [newBoard, changed, score] = moveLeft(newBoard);
  newBoard = transpose(newBoard);
  return [newBoard, changed, score];
};

// export const scoreUpdater = (board) => {
//   let score = 0;
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (board[i][j] !== 0) {
//         score += board[i][j];
//       }
//     }
//   }
//   return score;
// };

export const moveDown = (board) => {
  let changed, score;
  let newBoard = transpose(board);
  [newBoard, changed, score] = moveRight(newBoard);
  newBoard = transpose(newBoard);
  return [newBoard, changed, score];
};

export const checkGameOver = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return false;
      }
      if (i > 0 && board[i][j] === board[i - 1][j]) {
        return false;
      }
      if (j > 0 && board[i][j] === board[i][j - 1]) {
        return false;
      }
    }
  }
  return true;
};
