import * as React from 'react';
import { IRouter } from 'react-router';
import * as _ from 'lodash';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as debugLib from 'debug';

import { GoodsEnum } from '../api/Types';
import Navigator from '../utils/Navigator';
import Login from './Login';
import VendingMachine from './VendingMachine';

const log = debugLib('vm:Dashboard');

class PDashboard {
}

class SDashboard {
}

@observer
class Dashboard extends React.Component<PDashboard, SDashboard> {

	constructor(props) {
		super(props);
		this.state = new SDashboard();
	}

	render() {
		const { state } = this;
		if (Navigator.isLogin) {
			return (
				<Login />
			)
		}
		return (
			<VendingMachine />
		)
	}

}

export default Dashboard;
