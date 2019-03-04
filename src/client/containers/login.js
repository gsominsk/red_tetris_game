import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link } from "react-router-dom";

class Login extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="login-container">
                <div className="login-wrap">
                    <div className="login-info">LOGIN</div>
                    <input type="email" placeholder="your email"/>
                    <input type="password" placeholder="your password"/>
                    <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
                    <div className="btn"><Link to="/login/register">REGISTER</Link></div>
                    <div className="btn"><Link to="/login/newpass">FORGOT PASSWORD</Link></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(Login);