import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React                                    from 'react'
import { connect }                              from 'react-redux'

import LogBtn       from '../components/LogBtn'
import Io           from '../components/Socket'

import {
    logOutFetch,
}                   from "../actions/user";


class Menu extends React.Component {
    constructor (props) {
        super(props);
    }

    logOutClick = () => {
        this.props.logOutFetch(Io.socket, {
            sessionKey: window.sessionStorage.getItem('sessionRTG')
        });
    };

    render () {
        return (
            <div className="menu-container">
                <div className="menu-wrap">
                    <div className="menu-list">
                        <div className="btn"><Link to="/play">PLAY</Link></div>
                        <div className="btn"><Link to="/rates">RATES</Link></div>
                        <LogBtn onClick={this.logOutClick} loggedIn={!(this.props.session == null)}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        menu: state.user,
        session: state.user.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutFetch: (url, data) => dispatch(logOutFetch(url, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);