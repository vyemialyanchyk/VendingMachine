import * as React from 'react';
import { Route } from 'react-router';

import App from './pages/App';
import Dashboard from './pages/Dashboard';

export default (
	<Route path="/" component={App}>
		<Route path="dashboard" component={Dashboard} />
	</Route>
);
