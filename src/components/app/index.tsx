import React, { useState } from 'react';
import { GameState, ViewCell } from '../../game/types';
import { getViewField } from '../../game';
import { Dispatch } from '../../types';
import { openCellAction, markCellAction, newGameAction } from '../../actions';
import { Cell } from '../cell';
import style from './index.module.css';
import { SettingsDialog } from '../settings';

export interface AppProps {
    game: GameState;
    dispatch: Dispatch;
}

export const App = ({ game, dispatch }: AppProps) => {
    const [settings, setSettings] = useState(false);

    const field = game.win || game.lose ? game.field : getViewField(game);

    const cells: ViewCell[] = [];
    field.forEach((row) => row.forEach((cell) => cells.push(cell)));

    const width = Math.min(500, window.innerWidth);

    const cellSize = Math.floor(width / game.size[0]);

    return (
        <div className={style.container} style={{ width }}>
            <div className={style.header}>
                <div>
                    Size: {game.size[0]}x{game.size[1]}, mines: {game.minesCount}
                </div>
                <div>
                    <button onClick={() => setSettings(!settings)}>Settings</button>
                </div>
            </div>
            <div className={style.fieldWrapper} style={{ height: width }}>
                <div
                    className={style.field}
                    style={{
                        gridTemplateColumns: `repeat(${game.size[0]}, 50px)`,
                        transform: `scale(${cellSize / 50})`,
                    }}
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
                {settings && (
                    <SettingsDialog
                        size={game.size}
                        minesCount={game.minesCount}
                        onSubmit={(size, minesCount) => {
                            dispatch(newGameAction(size, minesCount));
                            setSettings(false);
                        }}
                    />
                )}
            </div>
            {game.lose && (
                <div
                    onClick={() => dispatch(newGameAction(game.size, game.minesCount))}
                    className={style.lose}
                >
                    WASTED
                </div>
            )}
            {game.win && (
                <div
                    onClick={() => dispatch(newGameAction(game.size, game.minesCount))}
                    className={style.win}
                >
                    WIN!
                </div>
            )}
        </div>
    );
};
