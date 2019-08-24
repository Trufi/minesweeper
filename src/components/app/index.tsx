import React from 'react';
import { GameState, ViewCell } from '../../game/types';
import { getViewField } from '../../game';
import { Dispatch } from '../../types';
import './index.css';
import { openCellAction } from '../../actions';

export interface AppProps {
    game: GameState;
    dispatch: Dispatch;
}

const cellSize = 50;

interface CellProps {
    cell: ViewCell;
    onClick: () => void;
}

const Cell = ({ cell, onClick }: CellProps) => {
    const style = {
        top: `${cellSize * cell.y}px`,
        left: `${cellSize * cell.x}px`,
    };

    if (cell.type === 'empty') {
        return (
            <div style={style} className='cell empty'>
                {cell.number}
            </div>
        );
    }

    if (cell.type === 'mine') {
        return (
            <div style={style} className='cell mine'>
                x
            </div>
        );
    }

    return <div style={style} className='cell unknown' onClick={onClick}></div>;
};

export const App = ({ game, dispatch }: AppProps) => {
    const field = getViewField(game);
    const cells: ViewCell[] = [];
    field.forEach((row) => row.forEach((cell) => cells.push(cell)));

    return (
        <div>
            <div>
                Size: {game.size[0]}x{game.size[1]}, mines count: {game.minesCount}
            </div>
            <div style={{ position: 'relative' }}>
                {cells.map((cell) => (
                    <Cell
                        key={`${cell.x}_${cell.y}`}
                        cell={cell}
                        onClick={() => dispatch(openCellAction(cell.x, cell.y))}
                    />
                ))}
            </div>
        </div>
    );
};
