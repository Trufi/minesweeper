import React from 'react';
import cn from 'classnames';
import { GameState, ViewCell } from '../../game/types';
import { getViewField } from '../../game';
import { Dispatch } from '../../types';
import { openCellAction } from '../../actions';
import style from './index.module.css';

export interface AppProps {
    game: GameState;
    dispatch: Dispatch;
}

interface CellProps {
    cell: ViewCell;
    onClick: () => void;
}

const Cell = ({ cell, onClick }: CellProps) => {
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

    return <div className={cn(style.cell, style.unknown)} onClick={onClick}></div>;
};

export const App = ({ game, dispatch }: AppProps) => {
    const field = getViewField(game);

    return (
        <div>
            <div>
                Size: {game.size[0]}x{game.size[1]}, mines count: {game.minesCount}
            </div>
            <div className={style.field}>
                {field.map((row, y) => (
                    <div key={y} className={style.row}>
                        {row.map((cell) => (
                            <Cell
                                key={`${cell.x}_${cell.y}`}
                                cell={cell}
                                onClick={() => dispatch(openCellAction(cell.x, cell.y))}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {game.lose && <div className={style.lose}>WASTED</div>}
            {game.win && <div className={style.win}>WIN!</div>}
        </div>
    );
};
