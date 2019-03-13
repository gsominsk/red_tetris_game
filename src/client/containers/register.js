import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link }  from "react-router-dom";
import SideMenu         from './sidemenu'
import {
    registerFetchData,
    registerOnUnmountClean
}                       from "../actions/register";
import PropTypes        from "prop-types";

class Register extends React.Component {
    static propTypes = {
        register    : PropTypes.object
    };

    constructor (props) {
        super(props);

        this.state = ({
            open: false,
            form: {
                email: '',
                login: '',
                password: '',
                passwordRe: '',
                validPasswords: true
            }
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    onChange = (event) => {
        this.state.form[event.target.name] = event.target.value;
        this.state.form.validPasswords = this.state.form.password === this.state.form.passwordRe;

        let passwordField = document.getElementsByClassName('register-password-input')[0];
        if (this.state.form.validPasswords)
            passwordField.setCustomValidity('');
        else
            passwordField.setCustomValidity('Пароли не совпадают');

        passwordField.setCustomValidity(
            this.state.form.validPasswords ?
                '' : 'Пароли не совпадают');
    }

    onSubmit = (event) => {
        if (!event.target.checkValidity())
            return ;

        event.preventDefault();

        this.props.registerFetchData('url', 'data')
    };

    componentWillUnmount() {
        console.log('[+] REGISTER | unmount props before : ', this.props);
        this.props.registerClean();
    }

    render () {
        console.log('[+] REGISTER | render props : ', this.props);

        return (
            <div className="register-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`register-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="register-info">REGISTER</div>
                    <div className={`error-msg ${!this.props.register.hasErrored ? "hide" : ""}`}>Error. Try later.</div>
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
        register: state.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerFetchData: (url, data) => dispatch(registerFetchData(url, data)),
        registerClean: () => dispatch(registerOnUnmountClean())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);