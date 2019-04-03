import React                    from 'react'
import { connect }              from 'react-redux'

import {Route, Link, Redirect} from "react-router-dom";
import SideMenu         from './sidemenu'

import NewPassFormEmail from '../components/NewPassFormEmail'
import NewPassFormCode  from '../components/NewPassFormCode'
import Error            from '../components/Error'
import Success          from '../components/Success'
import Io               from '../components/Socket'

import {
    newPassEmailFetchData,
    newPassResetFetchData,
    userOnUnmountClean
}                       from "../actions/user";

class NewPass extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false,
            formCode: {
                email: '',
                code: '',
                password: '',
                passwordRe: '',
                validPasswords: true
            }
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    formEmailOnSubmit = (event) => {
        event.preventDefault();

        if (!event.target.checkValidity())
            return ;

        this.props.newPassEmailFetchData(Io.socket, this.state.formCode.email);
    };

    formCodeOnSubmit = (event) => {
        event.preventDefault();
        this.props.newPassResetFetchData(Io.socket, {
            code: this.state.formCode.code,
            password: this.state.formCode.password,
            email: this.props.newpass.resetPass.email
        });
    };

    formCodeOnChange = (event) => {
        this.state.formCode[event.target.name] = event.target.value;
        this.state.formCode.validPasswords = this.state.formCode.password === this.state.formCode.passwordRe;

        let passwordField = document.getElementsByClassName('newpass-password-input')[0];

        passwordField.setCustomValidity(
            this.state.formCode.validPasswords ?
                '' : 'Пароли не совпадают');
    };

    formEmailOnChange = (event) => {
        this.state.formCode[event.target.name] = event.target.value;
    };

    componentWillUnmount() {
        this.props.newPassOnUnmountClean({session: window.sessionStorage.getItem('sessionRTG')});
    }

    render () {
        if (this.props.newpass.success)
            return (
                <Redirect to="/login" push />
            );

        return (
            <div className="newpass-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`newpass-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="newpass-info">FORGOT PASSWORD</div>
                    <Error msg={this.props.newpass.errMsg} render={this.props.newpass.hasErrored}/>
                    <Success msg={this.props.newpass.successMsg} render={!this.props.newpass.hasErrored && this.props.newpass.resetPass.emailSent}/>
                    <NewPassFormEmail onSubmit={this.formEmailOnSubmit} onChange={this.formEmailOnChange} render={!this.props.newpass.resetPass.emailSent}/>
                    <NewPassFormCode onSubmit={this.formCodeOnSubmit} onChange={this.formCodeOnChange} render={this.props.newpass.resetPass.emailSent}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        newpass: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newPassEmailFetchData: (url, data) => dispatch(newPassEmailFetchData(url, data)),
        newPassResetFetchData: (url, data) => dispatch(newPassResetFetchData(url, data)),
        newPassOnUnmountClean: (data) => dispatch(userOnUnmountClean(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPass);