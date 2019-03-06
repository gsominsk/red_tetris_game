import React, { Component, PropTypes } from 'react';

export default class RatesListItem extends Component {
    render (props) {
        console.log('[+] props : ', props);
        return (
            <li className="rl-item">
                <span className="rl-item-num">{`${props.num}.`}</span>
                <span className="rl-item-login">{`${props.login}`}</span>
                <span className="rl-item-score">{`${props.score}`}</span>
            </li>
        );
    }

}