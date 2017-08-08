import 'babel-polyfill';

import debugLib from 'debug';
import InitDebug from './InitDebug';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './Routes';
import App from './pages/App';

const log = debugLib('vm:app');

function withBasename(history, dirname) {
	return useBasename(() => history)({ basename: `/${dirname}` })
}

const router = (<Router history={browserHistory}>
	{Routes}
</Router>);

const getPreparedDocument = () => {
	return document.getElementById('react-root');
}

render(<App />, getPreparedDocument());