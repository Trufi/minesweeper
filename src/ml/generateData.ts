import { createGame, openCell } from '../game';
import { randomSeed, insideField } from '../game/utils';
import { Mine, Cell, ViewCell } from '../game/types';

export interface TestData {
    size: number[];
    field: ViewCell[][];
    mines: Mine[];
}

export const createData = (size: number[], minesCount: number): TestData => {
    const game = createGame(randomSeed(), size, minesCount);

    const randomCell = () => [
        Math.floor(Math.random() * size[0]),
        Math.floor(Math.random() * size[1]),
    ];

    let x = 0;
    let y = 0;

    do {
        [x, y] = randomCell();
    } while (game.field[y][x].type === 'mine');

    openCell(game, x, y);

    // Ищем мины рядом с открытыми
    const nearestMines = game.mines.filter((mine) =>
        isMineNearWithOpenCell(mine, game.field, game.size),
    );

    const knownField: ViewCell[][] = [];

    for (let y = 0; y < size[1]; y++) {
        knownField[y] = [];

        for (let x = 0; x < size[0]; x++) {
            const cell = game.field[y][x];
            if (cell.opened) {
                knownField[y][x] = cell;
            } else {
                knownField[y][x] = {
                    type: 'unknown',
                    x,
                    y,
                    marked: cell.marked,
                };
            }
        }
    }

    return {
        field: knownField,
        mines: nearestMines,
        size,
    };
};

const isMineNearWithOpenCell = (mine: Mine, field: Cell[][], size: number[]) => {
    const { x, y } = mine;

    const isOpen = (x: number, y: number): boolean => {
        if (insideField(size, x, y)) {
            const cell = field[y][x];
            return cell.opened;
        }

        return false;
    };

    return (
        isOpen(x + 1, y + 1) ||
        isOpen(x + 1, y) ||
        isOpen(x + 1, y - 1) ||
        isOpen(x, y + 1) ||
        isOpen(x, y - 1) ||
        isOpen(x - 1, y + 1) ||
        isOpen(x - 1, y) ||
        isOpen(x - 1, y - 1)
    );
};
