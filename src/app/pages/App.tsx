import * as React from 'react';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import * as debugLib from 'debug';

import Dashboard from './Dashboard';

const log = debugLib('vm:App');

interface IApp extends React.Props<App> {
	route: any;
	params: any;
}

class SApp {
}

@observer
class App extends React.Component<IApp, SApp> {

	render() {
		let childrenWithProps = React.Children.map(this.props.children, (child: any) => {
			return React.cloneElement(child);
		});
		return (
			<div style={{
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column'
			}}>
				<main>
					<div style={{
						boxSizing: 'border-box',
						padding: '18px'
					}}>
						{childrenWithProps ? childrenWithProps : this.getDefault()}
					</div>
				</main>
			</div>
		)
	}

	getDefault: () => void = () => {
		return (
			<Dashboard />
		)
	}
}

export default App;
