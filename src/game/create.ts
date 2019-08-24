import { GameState, Mine, Cell } from './types';
import { random, insideField } from './utils';

const createUniqMines = (seed: number, size: number[], minesCount: number): [number, Mine[]] => {
    let rnd: number;

    const busyFields = new Set<string>();
    const mines: Mine[] = [];

    let i = 0;

    while (i < minesCount) {
        [seed, rnd] = random(seed);
        const x = Math.floor(rnd * size[0]);

        [seed, rnd] = random(seed);
        const y = Math.floor(rnd * size[1]);

        const key = `${x}_${y}`;

        if (!busyFields.has(key)) {
            busyFields.add(key);
            mines.push({
                type: 'mine',
                x,
                y,
                opened: false,
            });
            i++;
        }
    }

    return [seed, mines];
};

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
            };
        }
    }
    return field;
};

const incrementCellNumber = (field: Cell[][], size: number[], x: number, y: number) => {
    if (!insideField(size, x, y)) {
        return;
    }

    const cell = field[y][x];
    if (cell.type === 'mine') {
        return;
    }

    cell.number++;
};

const addMineToField = (field: Cell[][], size: number[], mine: Mine) => {
    const { x, y } = mine;

    field[y][x] = mine;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }

            incrementCellNumber(field, size, x + i, y + j);
        }
    }
};

export const createGame = (seed: number, size: number[], minesCount: number): GameState => {
    const field = createEmptyField(size);

    const [, mines] = createUniqMines(seed, size, minesCount);

    mines.forEach((mine) => addMineToField(field, size, mine));

    return {
        field,
        size,
        minesCount,
        lose: false,
    };
};
