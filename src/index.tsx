import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { App } from './components/app';
import * as serviceWorker from './serviceWorker';
import { createGame, openCell } from './game';
import { Action } from './actions';
import { Dispatch } from './types';

const game = createGame(5, [10, 10], 3);

const render = () => {
    ReactDOM.render(<App game={game} dispatch={dispatch} />, document.getElementById('root'));
};

const dispatch: Dispatch = (action: Action) => {
    switch (action.type) {
        case 'openCell':
            openCell(game, action.x, action.y);
            break;
    }

    render();
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
