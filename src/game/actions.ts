import { GameState, Mine, ViewField } from './types';
import { insideField } from './utils';

export const openCell = (game: GameState, x: number, y: number) => {
    const { field, size, win, lose } = game;

    if (win || lose || !insideField(size, x, y)) {
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

    checkWin(game);
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
        openEmptyCell(game, x + 1, y + 1);
        openEmptyCell(game, x + 1, y - 1);
        openEmptyCell(game, x + 1, y);
        openEmptyCell(game, x - 1, y);
        openEmptyCell(game, x - 1, y + 1);
        openEmptyCell(game, x - 1, y - 1);
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
                    marked: cell.marked,
                };
            }
        }
    }

    return viewField;
};

const checkWin = (game: GameState) => {
    const { lose, field, size } = game;

    if (lose) {
        return;
    }

    for (let y = 0; y < size[1]; y++) {
        for (let x = 0; x < size[0]; x++) {
            const cell = field[y][x];

            if (cell.type === 'empty' && !cell.opened) {
                return;
            }
        }
    }

    game.win = true;
};

export const markCell = (game: GameState, x: number, y: number) => {
    const { win, lose, field, size } = game;

    if (win || lose || !insideField(size, x, y)) {
        return;
    }

    const cell = field[y][x];
    cell.marked = !cell.marked;
};
