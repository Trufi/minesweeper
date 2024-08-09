import React from 'react';
import { TestData } from '../../ml/generateData';
import { ViewCell } from '../../game/types';
import { Cell } from '../cell';

export interface MlFieldProps {
    data: TestData;
}

const key = (cell: ViewCell) => `${cell.x}_${cell.y}`;

export const MlField = ({ data: { size, field, mines } }: MlFieldProps) => {
    const mineSet = new Set<string>();
    mines.forEach((mine) => mineSet.add(key(mine)));

    const cells: ViewCell[] = [];
    field.forEach((row) =>
        row.forEach((cell) => {
            cell.marked = mineSet.has(key(cell));
            cells.push(cell);
        }),
    );

    const width = 200;
    const cellSize = Math.floor(width / size[0]);

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${size[0]}, 50px)`,
                    transformOrigin: 'top left',
                    transform: `scale(${cellSize / 50})`,
                    width: `${width}px`,
                    height: `${width}px`,
                    margin: '5px',
                }}
            >
                {cells.map((cell) => (
                    <Cell key={`${cell.x}_${cell.y}`} cell={cell} />
                ))}
            </div>
        </div>
    );
};
