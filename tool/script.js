const cells = document.querySelectorAll(".cell");
const currentPlayerSpan = document.getElementById("current-player");
const winnerSpan = document.getElementById("winner");
const winnerText = document.querySelector(".winner");
const resetButton = document.querySelector(".reset-button");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== "" || !gameActive) return;

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    winnerSpan.textContent = currentPlayer;
    winnerText.style.display = "block";
    return;
  }

  if (board.every((cell) => cell !== "")) {
    gameActive = false;
    winnerSpan.textContent = "Draw";
    winnerText.style.display = "block";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerSpan.textContent = currentPlayer;
}

function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  currentPlayerSpan.textContent = currentPlayer;
  winnerSpan.textContent = "";
  winnerText.style.display = "none";
  cells.forEach((cell) => (cell.textContent = ""));
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
