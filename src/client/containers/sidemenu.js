import { Route, Link }  from "react-router-dom";
import React            from 'react'
import { connect }      from 'react-redux'

import LogBtn           from '../components/LogBtn'
import Io               from '../components/Socket'
import {logOutFetch}    from "../actions/user";

export const SideMenuTest = () => {
    return (
        <SideMenu/>
    )
}


class SideMenu extends React.Component {
    constructor (props) {
        super(props);
    }

    logOutClick = () => {
        this.props.logOutFetch(Io.socket, {
            sessionKey: window.sessionStorage.getItem('sessionRTG')
        });
    };

    render () {
        const {onClick, open} = this.props;

        console.log('[+] SIDE MENU | session : ', this.props.session);

        return (
            <div contentEditable={false} className={`sidemenu-container ${open ? 'open-side-menu' : ''}`}>
                <div className="sidemenu-wrap">
                    <div className="menu-list">
                        <div className="btn"><Link to="/">MULTI PLAYER</Link></div>
                        <div className="btn"><Link to="/singleplay">SINGLE</Link></div>
                        <div className="btn"><Link to="/rates">RATES</Link></div>
                        <LogBtn onClick={this.logOutClick} loggedIn={!(this.props.session == null)}/>
                    </div>
                    <div className="sidemenu-btn" onClick={onClick}>
                        <div id="nav-icon3" className={`${open ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sidemenu: state.user,
        session: state.user.session
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOutFetch: (url, data) => dispatch(logOutFetch(url, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);