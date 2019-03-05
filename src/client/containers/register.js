import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link } from "react-router-dom";
import SideMenu from './sidemenu'

class Register extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="register-container">
                <SideMenu/>
                <div className="register-wrap">
                    <div className="register-info">REGISTER</div>
                    <input type="email" placeholder="your email"/>
                    <input type="password" placeholder="your password"/>
                    <input type="password" placeholder="repeat password"/>
                    <input type="text" placeholder="login" maxLength="10"/>
                    <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        register: state.register
    }
}

export default connect(mapStateToProps, null)(Register);