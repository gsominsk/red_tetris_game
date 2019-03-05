import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link } from "react-router-dom";

class SideMenu extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            className: 'sidemenu',
            open: false
        };
    }

    onClick = () => {
        let state = this.setState({open: !this.state.open});

        this.props.onChange(this.state);

        return state;
    };

    render () {
        console.log('[+] Side Menu | state : ', this.state);
        return (
            <div className={`sidemenu-container ${this.state.open ? 'open' : ''}`}>
                <div className="sidemenu-wrap">
                    <div className="menu-list">
                        <div className="btn"><Link to="/play">PLAY</Link></div>
                        <div className="btn"><Link to="/rates">RATES</Link></div>
                        <div className="btn"><Link to="/login">LOGIN</Link></div>
                    </div>
                    <div className="sidemenu-btn" onClick={this.onClick}>
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
};

export default connect(mapStateToProps, null)(SideMenu);