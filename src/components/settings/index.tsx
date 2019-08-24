import React, { useState } from 'react';
import style from './index.module.css';

export interface SettingsDialogProps {
    size: number[];
    minesCount: number;
    onSubmit: (size: number[], minesCount: number) => void;
}

export const SettingsDialog = ({ size, minesCount, onSubmit }: SettingsDialogProps) => {
    const [state, setState] = useState({
        size: size[0],
        minesCount,
    });

    return (
        <div className={style.container}>
            <div className={style.center}>
                <div className={style.label}>
                    Size:{' '}
                    <input
                        className={style.input}
                        type='number'
                        value={state.size}
                        onChange={(ev) =>
                            setState({
                                ...state,
                                size: Math.min(Number(ev.target.value), 50),
                            })
                        }
                    />
                </div>
                <div className={style.label}>
                    Mines:{' '}
                    <input
                        className={style.input}
                        type='number'
                        value={state.minesCount}
                        onChange={(ev) =>
                            setState({
                                ...state,
                                minesCount: Math.min(Number(ev.target.value), 500),
                            })
                        }
                    />
                </div>
                <button onClick={() => onSubmit([state.size, state.size], state.minesCount)}>
                    Submit
                </button>
            </div>
        </div>
    );
};
