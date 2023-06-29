import './css/style.css';

import { SnakeLiveManager } from './snakeLiveManager';
import { Dimension, Direction, Food, Snake, SnakeBlock, SnakeState } from './types';

const GAME_SPEED = 100;
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'white';
const SNAKE_HEAD_COLOR = 'mediumseagreen';
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

const GRID_SCALE = 10;

const buttonRestart = document.getElementById('restart') as HTMLButtonElement;
buttonRestart.onclick = () => startGame();

const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d')!;
document.addEventListener('keydown', onKeyDown);

const gridDimension: Dimension = {
    w: gameCanvas.width / GRID_SCALE - 1,
    h: gameCanvas.height / GRID_SCALE - 1,
};

const snakeLiveManager = new SnakeLiveManager(gridDimension);

let newDirection: Direction | undefined;
let isGameOver = false;

function startGame() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    isGameOver = false;
    displayInformation('');
    changeDirection(RIGHT_KEY);
    const state: SnakeState | undefined = undefined;
    main(state);
}

startGame();

let timeoutId: NodeJS.Timeout | undefined;

function main(state: SnakeState | undefined) {
    displayScore(state ? state.score : 0);

    timeoutId = setTimeout(function onTick() {
        timeoutId = undefined;
        clearCanvas();
        state = snakeLiveManager.update(state, newDirection);
        newDirection = undefined;
        if (state) {
            drawFood(state.food);
            drawSnake(state.snake);
            if (state.gameOver) {
                displayInformation('OVER !');
                isGameOver = true;
                // timeoutId = setTimeout(() => {
                //     timeoutId = undefined;
                //     startGame();
                // }, 5000);
                return;
            }
        }
        main(state);
    }, GAME_SPEED);
}

function clearCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    ctx.strokeStyle = CANVAS_BORDER_COLOR;
    ctx.lineWidth = 0.2;

    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawFood(food: Food | undefined) {
    if (!food) return;
    ctx.fillStyle = FOOD_COLOR;
    ctx.strokeStyle = FOOD_BORDER_COLOR;
    ctx.fillRect(food.x * GRID_SCALE, food.y * GRID_SCALE, GRID_SCALE, GRID_SCALE);
    ctx.strokeRect(food.x * GRID_SCALE, food.y * GRID_SCALE, GRID_SCALE, GRID_SCALE);
}

function drawSnake(snake: Snake) {
    snake.forEach((part, index) => drawSnakePart(part, index === 0));
}

function drawSnakePart(snakePart: SnakeBlock, head: boolean) {
    ctx.fillStyle = head ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;
    ctx.fillRect(snakePart.x * GRID_SCALE, snakePart.y * GRID_SCALE, GRID_SCALE, GRID_SCALE);
    ctx.strokeRect(snakePart.x * GRID_SCALE, snakePart.y * GRID_SCALE, GRID_SCALE, GRID_SCALE);
}

function displayScore(score: number) {
    document.getElementById('score')!.innerHTML = `${score}`;
}

function displayInformation(info: string) {
    document.getElementById('info')!.innerHTML = `${info}`;
}

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

function onKeyDown(event: KeyboardEvent) {
    changeDirection(event.keyCode);
}

function changeDirection(keyPressed: number) {
    if (isGameOver) return;
    if (newDirection) return;
    if (keyPressed === LEFT_KEY) {
        newDirection = Direction.LEFT;
    } else if (keyPressed === UP_KEY) {
        newDirection = Direction.UP;
    } else if (keyPressed === RIGHT_KEY) {
        newDirection = Direction.RIGHT;
    } else if (keyPressed === DOWN_KEY) {
        newDirection = Direction.DOWN;
    }
    if (newDirection !== undefined) {
        displayInformation(Direction[newDirection]);
    } else {
        displayInformation('');
    }
}
