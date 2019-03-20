import React, { Component}  from 'react';
import PropTypes            from 'prop-types'
import {Link}               from "react-router-dom";

export default class LogBtn extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.loggedIn)
            return <div className="btn"><Link to="/login">LOGIN</Link></div>;

        return (
            <div className="btn" onClick={this.props.onClick}>LOGOUT</div>
        );
    }
}