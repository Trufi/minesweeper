import { createRoot } from 'react-dom/client';
import { Action } from './actions';
import { App } from './components/app';
import { createGame, openCell } from './game';
import { markCell } from './game/actions';
import { randomSeed } from './game/utils';
import './index.css';
import { Dispatch } from './types';

let game = createGame(randomSeed(), [200, 200], 0.1);

const container = document.getElementById('root');
const root = createRoot(container!);
const render = () => {
    root.render(<App game={game} dispatch={dispatch} />);
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
            game = createGame(randomSeed(), action.size, 0.1);
            break;
    }

    render();
};

render();
