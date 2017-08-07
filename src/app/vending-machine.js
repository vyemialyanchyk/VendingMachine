import 'babel-polyfill';

import debugLib from 'debug';
import InitDebug from './InitDebug';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import useBasename from 'history/lib/useBasename'
import Routes from './Routes';

const log = debugLib('vm:app');

function withBasename(history, dirname) {
	return useBasename(() => history)({ basename: `/${dirname}` })
}

const router = (<Router history={withBasename(browserHistory, __dirname)}>
	{Routes}
</Router>);

const getPreparedDocument = () => {
	return document.getElementById('react-root');
}

render(router, getPreparedDocument());