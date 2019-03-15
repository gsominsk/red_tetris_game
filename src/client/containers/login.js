import React                    from 'react'
import { connect }              from 'react-redux'
import { Redirect, Link }       from "react-router-dom";
import PropTypes                from 'prop-types'
import io                       from "socket.io-client"

import SideMenu from './sidemenu'
import Error    from '../components/Error'
import Success  from '../components/Success'
import Io       from '../components/Socket'

import {
    loginFetchData,
    userOnUnmountClean
}               from "../actions/user";

class Login extends React.Component {
    static propTypes = {
        login       : PropTypes.object
    };

    constructor (props) {
        super(props);

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

        return this.props.loginFetchData(Io.socket, this.state.form);
    };

    onChange = (event) =>
        this.state.form[event.target.name] = event.target.value;

    componentWillUnmount() {
        this.props.loginOnUnmountClean();
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

                    <Error msg={this.props.login.errMsg} render={this.props.login.hasErrored}/>
                    <Success msg={this.props.login.successMsg} render={this.props.login.success}/>
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
        login: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginFetchData: (url, data) => dispatch(loginFetchData(url, data)),
        loginOnUnmountClean: () => dispatch(userOnUnmountClean()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);