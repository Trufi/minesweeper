import { GameState, Cell } from './types';
import { random, insideField } from './utils';

const createEmptyField = (size: number[]) => {
    const field: Cell[][] = [];
    for (let y = 0; y < size[1]; y++) {
        field[y] = [];

        for (let x = 0; x < size[0]; x++) {
            field[y][x] = {
                type: 'empty',
                x,
                y,
                number: 0,
                opened: false,
                marked: false,
            };
        }
    }
    return field;
};

const incrementCellNumber = (field: Cell[][], size: number[], x: number, y: number) => {
    if (insideField(size, x, y)) {
        field[y][x].number++;
    }
};

const markCellAsMine = (field: Cell[][], size: number[], x: number, y: number) => {
    const cell = field[y][x];
    cell.type = 'mine';

    incrementCellNumber(field, size, x - 1, y - 1);
    incrementCellNumber(field, size, x, y - 1);
    incrementCellNumber(field, size, x + 1, y - 1);

    incrementCellNumber(field, size, x - 1, y);
    incrementCellNumber(field, size, x + 1, y);

    incrementCellNumber(field, size, x - 1, y + 1);
    incrementCellNumber(field, size, x, y + 1);
    incrementCellNumber(field, size, x + 1, y + 1);
};

export const createGame = (seed: number, size: number[], probability: number): GameState => {
    const field = createEmptyField(size);

    let rnd = 0;
    let minesCount = 0;

    for (let y = 0; y < size[1]; y++) {
        for (let x = 0; x < size[0]; x++) {
            [seed, rnd] = random(seed);

            const isMine = rnd < probability;
            if (isMine) {
                markCellAsMine(field, size, y, x);
                minesCount++;
            }
        }
    }

    return {
        field,
        size,
        minesCount,
        lose: false,
        win: false,
    };
};
