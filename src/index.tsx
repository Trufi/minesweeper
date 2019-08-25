import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { App } from './components/app';
import * as serviceWorker from './serviceWorker';
import { createGame, openCell } from './game';
import { Action } from './actions';
import { Dispatch } from './types';
import { markCell } from './game/actions';
import { randomSeed } from './game/utils';
import { MlApp } from './components/mlApp';
import { createData, TestData } from './ml/generateData';
import { train } from './ml';

const startGame = () => {
    let game = createGame(5, [10, 10], 15);

    const render = () => {
        ReactDOM.render(<App game={game} dispatch={dispatch} />, document.getElementById('root'));
    };

    const dispatch: Dispatch = (action: Action) => {
        switch (action.type) {
            case 'openCell':
                openCell(game, action.x, action.y);
                break;
            case 'markCell':
                markCell(game, action.x, action.y);
                break;
            case 'newGame':
                game = createGame(randomSeed(), action.size, action.minesCount);
                break;
        }

        render();
    };

    render();
};

const startMl = () => {
    const data: TestData[] = [];

    for (let i = 0; i < 20; i++) {
        data.push(createData([10, 10], 10));
    }

    ReactDOM.render(<MlApp data={data} />, document.getElementById('root'));
};

if (window.location.search.slice(1) === 'test') {
    startMl();
} else if (window.location.search.slice(1) === 'ml') {
    train();
} else {
    startGame();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
