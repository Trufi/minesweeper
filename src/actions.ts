export const openCellAction = (x: number, y: number) => ({
    type: 'openCell' as 'openCell',
    x,
    y,
});

export type OpenCellAction = ReturnType<typeof openCellAction>;

export type Action = OpenCellAction;
