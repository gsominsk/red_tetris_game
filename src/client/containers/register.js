import React            from 'react'
import { connect }      from 'react-redux'
import PropTypes        from "prop-types";
import {Redirect}       from "react-router-dom";

import Io               from '../components/Socket'
import Error            from '../components/Error'
import Success          from '../components/Success'
import SideMenu         from './sidemenu'

import {
    registerFetchData,
    userOnUnmountClean
}                       from "../actions/user";

class Register extends React.Component {
    static propTypes = {
        register    : PropTypes.object
    };

    constructor (props) {
        super(props);

        this.state = ({
            open: false,
            form: {
                values: {
                    email: '',
                    login: '',
                    password: '',
                    passwordRe: '',
                },
                validPasswords: true
            }
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    onChange = (event) => {
        this.state.form.values[event.target.name] = event.target.value;
        this.state.form.validPasswords = this.state.form.values.password === this.state.form.values.passwordRe;

        let passwordField = document.getElementsByClassName('register-password-input')[0];

        passwordField.setCustomValidity(
            this.state.form.validPasswords ?
                '' : 'Пароли не совпадают');
    };

    onSubmit = (event) => {
        if (!event.target.checkValidity())
            return ;

        event.preventDefault();

        this.props.registerFetchData(Io.socket, this.state.form.values)
    };

    componentWillUnmount() {
        this.props.registerClean();
    }

    render () {
        if (this.props.register.success)
            return (
                <Redirect to="/login" push />
            );

        return (
            <div className="register-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`register-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="register-info">REGISTER</div>
                    <Error render={this.props.register.hasErrored} msg={this.props.register.errMsg}/>
                    <Success render={this.props.register.success} msg={this.props.register.successMsg}/>
                    <form className="register-form" onSubmit={this.onSubmit} onChange={this.onChange}>
                        <input name="email" type="email" placeholder="your email" required/>
                        <input name="password" className="register-password-input" type="password" placeholder="your password" minLength="5" required/>
                        <input name="passwordRe" type="password" placeholder="repeat password" minLength="5" required/>
                        <input name="login" type="text" placeholder="login" maxLength="10" required/>
                        <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        register: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerFetchData: (url, data) => dispatch(registerFetchData(url, data)),
        registerClean: () => dispatch(userOnUnmountClean())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);