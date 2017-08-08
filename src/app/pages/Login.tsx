import * as React from 'react';
import { IRouter } from 'react-router';
import * as _ from 'lodash';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as debugLib from 'debug';

import { GoodsEnum } from '../api/Types';

const log = debugLib('vm:Login');

class PLogin {
}

class SLogin {
}

@observer
class Login extends React.Component<PLogin, SLogin> {

	constructor(props) {
		super(props);
		this.state = new SLogin();
	}

	render() {
		const {state} = this;
		return (
			<div>
                login login login login login login login login 
			</div>
		)
	}

}

export default Login;
