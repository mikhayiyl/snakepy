import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  scores as values,
  paused,
  gameResume,
  snakeBody,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
const scores = document.querySelector("#score");
const gameScore = document.querySelector(".game-scores");
const Score = document.querySelector(".scores");
const pause = document.querySelector(".pause");
const footer = document.querySelector(".footer");
const container = document.querySelector(".container");
const resume = document.querySelector(".resume");
let getInterface = document.querySelector(".interface");

const gameBoard = document.querySelector("#game-board");

let lastRenderTime = 0;
let gameOver = false;

// //////////////GAME START
setTimeout(() => {
  getInterface.style.display = "block";
  container.style.display = "none";
  footer.style.display = "none";
  GameManager.setGameStart();
});
let GameManager = {
  setGameStart: function () {
    setTimeout(() => {
      GameManager.gamePreStart();
    }, 3000);
  },
  gamePreStart: function () {
    getInterface.innerHTML =
      '<div class="btns flex"><button class="btn resume" onclick="GameManager.startGame()">Start Game</button><button class="btn level">Arenas</button><button class="btn restart">Levels</button></div>';
  },
  startGame: function () {
    getInterface.style.display = "none";
    container.style.display = "block";
    footer.style.display = "block";
    scores.style.visibility = "hidden";
    pause.style.visibility = "visible";
  },
  mainMenu: function name() {
    getInterface.style.display = "block";
    container.style.display = "none";
    footer.style.display = "none";
    getInterface.innerHTML =
      '<div class="btns flex"><button class="btn level" onclick="GameManager.resumeGame()">Resume</button><button class="btn resume" onclick="GameManager.newGame()">New Game</button><button class="btn level">Arenas</button><button class="btn restart">Levels</button></div>';
  },
  resumeGame: function name() {
    if (gameOver) return (window.location = "/");
    gameResume();

    getInterface.style.display = "none";
    container.style.display = "block";
    footer.style.display = "block";
  },
  newGame: function name() {
    if (gameOver) return (window.location = "/");
    gameResume();

    getInterface.style.display = "none";
    container.style.display = "block";
    footer.style.display = "block";
  },
};

// //////////////GAME START
function main(currentTime) {
  if (gameOver) {
    // if (confirm("You lost . Press Ok to start")) {
    //   window.location = "/";
    // }
    updateScore();
    return;
  }

  window.requestAnimationFrame(main);

  const secSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
  updateScores();
}
function draw() {
  if (values() > 100) return updateScore();

  if (gameOver) return updateScore();
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  const value = values();
  if (paused) return null;
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || value > 49;
}

export function updateScore() {
  const value = values();
  scores.style.visibility = "visible";
  resume.style.display = "none";
  pause.style.display = "none";
  if (value > 49) {
    scores.style.visibility = "visible";
    Score.innerHTML = `
      <h4>You won !!!</h4>
      `;
  } else {
    Score.innerHTML = `
      <h4>Sorry you lost !!!</h4>
      <h6>Scores : ${value}</h6>
      `;
  }
}
function updateScores() {
  gameScore.innerHTML = `
    <p>Scores </p>
    <h6> ${values()}</h6>
    `;
}

window.GameManager = GameManager;
