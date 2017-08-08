import 'babel-polyfill';

import debugLib from 'debug';
import InitDebug from './InitDebug';
import React from 'react';
import { render } from 'react-dom';
import App from './pages/App';

const log = debugLib('vm:app');

const getPreparedDocument = () => {
	return document.getElementById('react-root');
}

render(<App />, getPreparedDocument());