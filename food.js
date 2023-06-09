import { onSnake, expandSnake } from "./snake.js";
import { randomGridPos } from "./grid.js";

let food = randomFoodPos();
const EXPANSIONRATE = 10;
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSIONRATE);
    food = randomFoodPos();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");

  gameBoard.appendChild(foodElement);
}

export function randomFoodPos() {
  let newFoodPos;
  while (newFoodPos == null || onSnake(newFoodPos)) {
    newFoodPos = randomGridPos();
  }

  return newFoodPos;
}
