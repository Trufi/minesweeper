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

export type Action = OpenCellAction | MarkCellAction;
