import { getInputDirection } from "./input.js";
const score = document.querySelector("#score");
let newSegment = 0;
export let paused = false;

export const SNAKE_SPEED = 2;
export let snakeBody = [{ x: 11, y: 11 }];
const restart = document.querySelector(".restart");
const pause = document.querySelector(".pause");
const resume = document.querySelector(".resume");

export function update() {
  addSegments();
  let num = 1;
  if (paused) num = 0;
  let inputDirection;
  paused
    ? (inputDirection = { x: 0, y: 0 })
    : (inputDirection = getInputDirection());

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + num] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {
  snakeBody.forEach((seg) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = seg.y;
    snakeElement.style.gridColumnStart = seg.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegment += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((seg, index) => {
    if (ignoreHead && index === 0) return false;

    if (paused) return null;
    return equalPosition(seg, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
function equalPosition(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody - 1] });
  }
  newSegment = 0;
}

export function scores() {
  let score;

  if (snakeBody.length === 1) {
    score = 0;
  } else {
    score = snakeBody.length - 1;
  }

  return score;
}

pause.addEventListener("click", () => {
  pauseGame();
  score.style.visibility = "visible";
  pause.style.visibility = "hidden";
});
resume.addEventListener("click", gameResume);
export function gameResume() {
  pause.style.visibility = "visible";
  score.style.visibility = "hidden";
  pauseGame();
}

restart.addEventListener("click", () => {
  window.location = "/";
});

function pauseGame() {
  paused = !paused;
}
