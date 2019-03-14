import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link }  from "react-router-dom";
import SideMenu         from './sidemenu'

import NewPassFormEmail from '../components/NewPassFormEmail'
import NewPassFormCode  from '../components/NewPassFormCode'
import Error            from '../components/Error'
import Success          from '../components/Success'

import {
    newPassFetchData,
    newPassOnUnmountClean
}                       from "../actions/newpass";

class NewPass extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false,
            formCode: {
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

        this.props.newPassFetchData();
    }

    formCodeOnSubmit = (event) => {
        event.preventDefault();
        this.props.newPassFetchData();
    }

    formCodeOnChange = (event) => {
        this.state.formCode[event.target.name] = event.target.value;
        this.state.formCode.validPasswords = this.state.formCode.password === this.state.formCode.passwordRe;

        let passwordField = document.getElementsByClassName('newpass-password-input')[0];

        passwordField.setCustomValidity(
            this.state.formCode.validPasswords ?
                '' : 'Пароли не совпадают');
    }

    componentWillUnmount() {
        this.props.newPassOnUnmountClean();
    }

    render () {
        return (
            <div className="newpass-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`newpass-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="newpass-info">FORGOT PASSWORD</div>
                    <Error msg="Error. Try later." render={this.props.newpass.hasErrored}/>
                    <Success msg="Code has sented to Email." render={!this.props.newpass.hasErrored}/>
                    <NewPassFormEmail onSubmit={this.formEmailOnSubmit} render={!this.props.newpass.data.emailSent}/>
                    <NewPassFormCode onSubmit={this.formCodeOnSubmit} onChange={this.formCodeOnChange} render={this.props.newpass.data.emailSent}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        newpass: state.newpass
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newPassFetchData: (url, data) => dispatch(newPassFetchData(url, data)),
        newPassOnUnmountClean: (url, data) => dispatch(newPassOnUnmountClean(url, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPass);