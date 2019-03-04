import React                    from 'react'
import { connect }              from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Rates extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="rates-container">
                <div className="rates-wrap">
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