import React, { Component}  from 'react';
import PropTypes            from 'prop-types'
import {Link}               from "react-router-dom";

export default class LogBtn extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log('[+] LOG BTN | props : ', this.props);
        console.log('[+] LOG BTN | session storage : ', window.sessionStorage);
        if (!this.props.loggedIn)
            return <div className="btn"><Link to="/login">LOGIN</Link></div>;

        return (
            <div className="btn" onClick={this.props.onClick}>LOGOUT</div>
        );
    }
}