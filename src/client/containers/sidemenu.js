import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link } from "react-router-dom";

class SideMenu extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="sidemenu-container">
                <div className="sidemenu-wrap">
                    <div className="menu-list">
                        <div className="btn"><Link to="/play">PLAY</Link></div>
                        <div className="btn"><Link to="/rates">RATES</Link></div>
                        <div className="btn"><Link to="/login">LOGIN</Link></div>
                    </div>
                    <div className="sidemenu-btn">
                        <div id="nav-icon3">
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
        sidemenu: state.sidemenu
    }
}

export default connect(mapStateToProps, null)(SideMenu);