import React                    from 'react'
import { connect }              from 'react-redux'
import { Redirect, Link }       from "react-router-dom";
import PropTypes                from 'prop-types'
import io                       from "socket.io-client"

import SideMenu from './sidemenu'
import Error    from '../components/Error'

import {
    loginFetchData,
    loginOnUnmountClean
}               from "../actions/login";
import {ping}   from "../actions/server";

let socket;

class Login extends React.Component {
    static propTypes = {
        login       : PropTypes.object
    };

    constructor (props) {
        super(props);

        socket = io.connect("http://localhost:3000")

        this.state = ({
            open: false,
            form: {
                email: '',
                password: ''
            }
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    onSubmit = (event) => {
        console.log('props : ', this.props)
        if (!event.target.checkValidity())
            return ;

        event.preventDefault();

        return this.props.loginFetchData(socket, this.state.form);
    };

    onChange = (event) =>
        this.state.form[event.target.name] = event.target.value;

    componentWillUnmount() {
        this.props.loginOnUnmountClean();
        socket.disconnect();
    }

    render () {
        console.log('[+] LOGIN | props : ', this.props);
        if (this.props.login && this.props.login.successfully)
            return (
                <Redirect to="/rates" push />
            );

        return (
            <div className="login-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`login-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="login-info">LOGIN</div>

                    <Error msg="Invalid email or password." render={this.props.login.hasErrored}/>
                    <form className="login-form" onSubmit={this.onSubmit} onChange={this.onChange}>
                        <input name="email" type="email" placeholder="your email" required/>
                        <input name="password" type="password" placeholder="your password" minLength="5" required/>
                        <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
                    </form>
                    <div className="btn"><Link to="/login/register">REGISTER</Link></div>
                    <div className="btn"><Link to="/login/newpass">FORGOT PASSWORD</Link></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginFetchData: (url, data) => dispatch(loginFetchData(url, data)),
        loginOnUnmountClean: () => dispatch(loginOnUnmountClean()),
        ping: () => dispatch(ping)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);