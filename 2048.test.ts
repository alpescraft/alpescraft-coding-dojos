type Grid = number[][];

class Random {
    static get(max: number) {
        return max;
    }
}

function play(grid: Grid, move: 'right' | 'left' | 'up' | 'down'): Grid {
    const result: Grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    let moved = false;
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            let cell = grid[row][column];

            if (cell !== 0) {
                if (column < grid[row].length - 1) {
                    moved = true;
                    result[row][column + 1] = cell;
                } else {
                    result[row][column] = cell;
                }
            }
        }
    }
    if (moved) {
        const emptyCells = [];
        for (let row = 0; row < result.length; row++) {
            for (let column = 0; column < result[row].length; column++) {
                if (result[row][column] === 0) {
                    emptyCells.push([row, column]);
                }
            }
        }
        const index = Random.get(emptyCells.length);
        const [row, column] = emptyCells[index];
        result[row][column] = 2;
    }

    return result;
}

describe('2048', () => {
    it('should do nothing when all is on right and moving to right, without adding a new number', async () => {
        const grid: Grid = [
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
        ];

        const result = play(grid, 'right');

        expect(result).toEqual([
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
        ]);
    });

    it('should move all on the right when move to right', async () => {
        Random.get = () => 4;

        const grid: Grid = [
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
        ];

        const result = play(grid, 'right');

        expect(result).toEqual([
            [0, 0, 0, 2],
            [0, 2, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
        ]);
    });

    it('should move all on the right when move to right and add new number to another place', async () => {
        Random.get = () => 9;

        const grid: Grid = [
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
        ];

        const result = play(grid, 'right');

        expect(result).toEqual([
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [2, 0, 0, 2],
        ]);
    });
});
