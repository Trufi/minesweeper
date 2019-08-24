import React from 'react';
import cn from 'classnames';
import { GameState, ViewCell } from '../../game/types';
import { getViewField } from '../../game';
import { Dispatch } from '../../types';
import { openCellAction, markCellAction } from '../../actions';
import style from './index.module.css';

export interface AppProps {
    game: GameState;
    dispatch: Dispatch;
}

interface CellProps {
    cell: ViewCell;
    onClick: () => void;
    onMarked: () => void;
}

const Cell = ({ cell, onClick, onMarked }: CellProps) => {
    const onContextMenu = (ev: React.MouseEvent) => {
        ev.preventDefault();
        onMarked();
    };

    if (cell.type === 'empty') {
        return (
            <div className={cn(style.cell, style.empty)}>
                {cell.number !== 0 ? cell.number : ''}
            </div>
        );
    }

    if (cell.type === 'mine') {
        return <div className={cn(style.cell, style.mine)}>x</div>;
    }

    if (cell.marked) {
        return (
            <div
                className={cn(style.cell, style.unknown, style.marked)}
                onClick={onClick}
                onContextMenu={onContextMenu}
            ></div>
        );
    }

    return (
        <div
            className={cn(style.cell, style.unknown)}
            onClick={onClick}
            onContextMenu={onContextMenu}
        ></div>
    );
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
            <div
                className={style.field}
                style={{ gridTemplateColumns: `repeat(${game.size[0]}, 50px)` }}
            >
                {cells.map((cell) => (
                    <Cell
                        key={`${cell.x}_${cell.y}`}
                        cell={cell}
                        onClick={() => dispatch(openCellAction(cell.x, cell.y))}
                        onMarked={() => dispatch(markCellAction(cell.x, cell.y))}
                    />
                ))}
            </div>
            {game.lose && <div className={style.lose}>WASTED</div>}
            {game.win && <div className={style.win}>WIN!</div>}
        </div>
    );
};
