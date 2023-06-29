export interface SnakeState {
    snake: Snake;
    moving?: Direction;
    gameOver?: boolean;
    food?: Food;
    score: number;
}

export type Snake = SnakeBlock[];

export interface SnakeBlock {
    x: number;
    y: number;
}

export enum Direction {
    LEFT = 'LEFT',
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
}

export interface Food {
    x: number;
    y: number;
}

export interface Dimension {
    w: number;
    h: number;
}
