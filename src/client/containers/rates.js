import React                    from 'react'
import { connect }              from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SideMenu from './sidemenu'

class Rates extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({});

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(state) {
        this.setState({ [state.className]: state });
    }

    render () {
        console.log('[+] Rates | state : ', this.state);
        return (
            <div className="rates-container">
                <SideMenu
                    onChange={this.handleChange}
                />
                <div className={`rates-wrap ${this.state.sidemenu && this.state.sidemenu.open ? 'opacity-zero-point-two' : ''}`}>
                    <span className="rates-info">RATES</span>
                    <span className="split"></span>
                    <ul className="rates-list">
                        <li className="rl-item">
                            <span className="rl-item-num">
                                1.
                            </span>
                            <span className="rl-item-login">
                                Some Login
                            </span>
                            <span className="rl-item-score">
                                10000
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rates: state.rates
    }
}

export default connect(mapStateToProps, null)(Rates);