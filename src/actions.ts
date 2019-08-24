export const openCellAction = (x: number, y: number) => ({
    type: 'openCell' as 'openCell',
    x,
    y,
});

export type OpenCellAction = ReturnType<typeof openCellAction>;

export const markCellAction = (x: number, y: number) => ({
    type: 'markCell' as 'markCell',
    x,
    y,
});

export type MarkCellAction = ReturnType<typeof markCellAction>;

export const newGameAction = (size: number[], minesCount: number) => ({
    type: 'newGame' as 'newGame',
    size,
    minesCount,
});

export type NewGameAction = ReturnType<typeof newGameAction>;

export type Action = OpenCellAction | MarkCellAction | NewGameAction;
