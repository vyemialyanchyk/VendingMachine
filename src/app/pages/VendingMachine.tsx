import * as React from 'react';
import { IRouter } from 'react-router';
import * as _ from 'lodash';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as debugLib from 'debug';

import { GoodsEnum } from '../api/Types';
const pathToApple = require('../../images/apple.jpg');
const pathToCherry = require('../../images/cherry.jpg');
const pathToPear = require('../../images/pear.jpg');
import Navigator from '../utils/Navigator';

const log = debugLib('vm:VendingMachine');

class PVendingMachine {
}

class SVendingMachine {
    @observable moneyInputWhole: string = undefined;
    @observable moneyInMachine: number = 0;
    @observable mapGoodsSelected: Array<boolean> = [false, false, false, false];
    @observable vendingMachineOutput: string = '';

    @action getGoodsAndChange = () => {
        let vendingMachineOutput: string = '';
        let moneyInMachine: number = this.moneyInMachine;
        let flagNoMoney: boolean = false;
        for (let key in GoodsEnum.names()) {
            if (this.mapGoodsSelected[key]) {
                if (moneyInMachine > 0) {
                    vendingMachineOutput += GoodsEnum.getLabel(GoodsEnum.getEnum4Name(key)) + ', ';
                    this.mapGoodsSelected[key] = false;
                    moneyInMachine -= 1;
                } else if (!flagNoMoney) {
                    vendingMachineOutput += '\'Not enouth money to get all selected\'' + ' ';
                    flagNoMoney = true;
                }
            }
        }
        this.moneyInMachine = 0;
        this.vendingMachineOutput = vendingMachineOutput + 'Change $ ' + moneyInMachine;
    }

    @action login = () => {
        Navigator.transitionToUrl('login');
    }

    @action submit = () => {
        this.moneyInMachine += this.moneyInputWhole ? Number(this.moneyInputWhole) : 0;
    }
}

@observer
class VendingMachine extends React.Component<PVendingMachine, SVendingMachine> {

    constructor(props) {
        super(props);
        this.state = new SVendingMachine();
    }

    render() {
        const { state } = this;
        return (
            <div style={{
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <div style={{
                    boxSizing: 'border-box',
                    margin: 40,
                    position: 'absolute',
                    right: 20,
                    top: 20,
                }}>
                    <button onClick={state.login} style={{
                        boxSizing: 'border-box',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 0,
                        borderRadius: 3,
                        width: 80,
                        height: 30,
                    }}>
                        <span>Login</span>
                    </button>
                </div>
                <div style={{
                    boxSizing: 'border-box',
                    margin: 30,
                    display: 'flex',
                }}>
                    <input ref='input' type='number' min='1' max='100' value={state.moneyInputWhole} onChange={this.updateMoneyInputValue} style={{
                        boxSizing: 'border-box',
                        width: 250,
                        marginRight: 30,
                        height: 30,
                    }}
                        placeholder='Put some amout of money to VM'
                    />
                    <button onClick={state.submit} style={{
                        boxSizing: 'border-box',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 0,
                        borderRadius: 3,
                        width: 80,
                        height: 30,
                    }}>
                        <span>Put money</span>
                    </button>
                </div>
                <div style={{
                    boxSizing: 'border-box',
                    marginBottom: 20,
                }}>
                    <span>Money in machine: $ {state.moneyInMachine}</span>
                </div>
                <div style={{
                    boxSizing: 'border-box',
                    margin: 20,
                }}>
                    <span>Select good(s):</span>
                </div>
                <div style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    <div style={{
                        boxSizing: 'border-box',
                        opacity: state.mapGoodsSelected[GoodsEnum.APPLE] ? 0.4 : 1.0,
                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                    }}>
                        <img style={{
                            cursor: 'pointer',
                        }} src='/images/apple.jpg' onClick={() => { this.selectGood(GoodsEnum.APPLE) }} height='240' width='240' />
                        <span>$ 1</span>
                    </div>
                    <div style={{
                        boxSizing: 'border-box',
                        opacity: state.mapGoodsSelected[GoodsEnum.CHERRY] ? 0.4 : 1.0,
                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                    }}>
                        <img style={{
                            cursor: 'pointer',
                        }} src='/images/cherry.jpg' onClick={() => { this.selectGood(GoodsEnum.CHERRY) }} height='240' width='240' />
                        <span>$ 1</span>
                    </div>
                    <div style={{
                        boxSizing: 'border-box',
                        opacity: state.mapGoodsSelected[GoodsEnum.PEAR] ? 0.4 : 1.0,
                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                    }}>
                        <img style={{
                            cursor: 'pointer',
                        }} src='/images/pear.jpg' onClick={() => { this.selectGood(GoodsEnum.PEAR) }} height='240' width='240' />
                        <span>$ 1</span>
                    </div>
                </div>
                <a tabIndex={-1} onClick={state.getGoodsAndChange} style={{
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    color: '#708e92',
                    margin: 30,
                }}>
                    Get selected good(s) and change
				</a>
                <span>Get yours: {state.vendingMachineOutput}</span>
            </div>
        )
    }

    updateMoneyInputValue = (event: any) => {
        this.state.moneyInputWhole = event.target.value;
    }

    selectGood: (good: GoodsEnum) => void = (good: GoodsEnum) => {
        this.state.mapGoodsSelected[good] = this.state.mapGoodsSelected[good] ? false : true;
        this.forceUpdate();
    }

}

export default VendingMachine;
