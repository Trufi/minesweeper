export interface GameState {
    size: number[];
    minesCount: number;
    field: Cell[][];
    lose: boolean;
    win: boolean;
}

export interface EmptyCell {
    type: 'empty';
    x: number;
    y: number;
    number: number;
    opened: boolean;
}

export interface Mine {
    type: 'mine';
    x: number;
    y: number;
    opened: boolean;
}

export type Cell = EmptyCell | Mine;

export interface UnknownCell {
    type: 'unknown';
    x: number;
    y: number;
}

export type ViewCell = Cell | UnknownCell;

export type ViewField = ViewCell[][];
