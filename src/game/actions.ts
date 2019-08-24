import { GameState, Mine, ViewField } from './types';
import { insideField } from './utils';

export const openCell = (game: GameState, x: number, y: number) => {
    const { field, size } = game;

    if (!insideField(size, x, y)) {
        return;
    }

    const cell = field[y][x];

    switch (cell.type) {
        case 'empty':
            openEmptyCell(game, x, y);
            break;
        case 'mine':
            openMine(game, cell);
            break;
    }
};

const openEmptyCell = (game: GameState, x: number, y: number) => {
    const { field, size } = game;

    if (!insideField(size, x, y)) {
        return;
    }

    const cell = field[y][x];
    if (cell.type === 'mine' || cell.opened) {
        return;
    }

    cell.opened = true;

    if (cell.number === 0) {
        openEmptyCell(game, x + 1, y);
        openEmptyCell(game, x - 1, y);
        openEmptyCell(game, x, y + 1);
        openEmptyCell(game, x, y - 1);
    }
};

const openMine = (game: GameState, mine: Mine) => {
    game.lose = true;
    mine.opened = true;
};

export const getViewField = (game: GameState) => {
    const { field, size } = game;

    const viewField: ViewField = [];

    for (let y = 0; y < size[1]; y++) {
        viewField[y] = [];

        for (let x = 0; x < size[0]; x++) {
            const cell = field[y][x];
            if (cell.opened) {
                viewField[y][x] = cell;
            } else {
                viewField[y][x] = {
                    type: 'unknown',
                    x,
                    y,
                };
            }
        }
    }

    return viewField;
};
