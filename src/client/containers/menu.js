import React                    from 'react'
import { connect }              from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Menu extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="menu-container">
                <div className="menu-wrap">
                    <div className="menu-list">
                        <div className="btn"><Link to="/play">PLAY</Link></div>
                        <div className="btn"><Link to="/rates">RATES</Link></div>
                        <div className="btn"><Link to="/login">LOGIN</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps, null)(Menu);