import {Dimension, Direction, SnakeState} from './types';
import {random} from "./utils";

export class SnakeLiveManager {
    constructor(private readonly gridDimension: Dimension) {}

    update(state: SnakeState | undefined, newDirection?: Direction): SnakeState | undefined {
        if (!state) {
            return {
                snake: this.generateSnake(),
                food: {x: 1, y: 1},
                gameOver: false,
                moving: Direction.RIGHT,
                score: 0,
            };
        }

        if (newDirection){
            state.moving = this.getDirection(state.moving, newDirection)
        }

        this.moveSnake(state);
        if ((state.snake[0].x === state.food?.x) && state.snake[0].y === state.food.y) {
            state.score ++;
            state.food = this.generateFood();
        }
        return state;
    }

    private moveSnake(state: SnakeState) {
        const head  = state.snake[0];
        state.snake.pop();
        if (state.moving === Direction.UP) {
            state.snake.unshift({x:head.x, y:head.y-1})
        } else if (state.moving === Direction.RIGHT){
            state.snake.unshift({x:head.x+1, y:head.y})
        } else if (state.moving === Direction.DOWN) {
            state.snake.unshift({x:head.x, y:head.y+1})
        } else if (state.moving === Direction.LEFT){
            state.snake.unshift({x:head.x-1, y:head.y})
        }
    }

    private generateSnake() {
        const snake = []
        for (let i = 0; i < 5; i++) {
            snake.push({x: this.gridDimension.w / 2 - i, y: this.gridDimension.h / 2})
        }
        return snake;
    }

    private getDirection(moving: Direction | undefined, newDirection: Direction) {
        const opposite = {
            [Direction.UP] : Direction.DOWN,
            [Direction.DOWN] : Direction.UP,
            [Direction.LEFT] : Direction.RIGHT,
            [Direction.RIGHT] : Direction.LEFT
        }
        if (opposite[newDirection] === moving) {
            return moving;
    }
        return newDirection
    }

    private generateFood() {
        return {x: random(0, this.gridDimension.w), y: random(0, this.gridDimension.h)};
    }
}
