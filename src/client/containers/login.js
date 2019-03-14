import React                    from 'react'
import { connect }              from 'react-redux'
import { Redirect, Link }       from "react-router-dom";
import PropTypes                from 'prop-types'

import SideMenu from './sidemenu'
import Error    from '../components/Error'

import {
    loginFetchData,
    loginOnUnmountClean
}               from "../actions/login";

class Login extends React.Component {
    static propTypes = {
        login       : PropTypes.object
    };

    constructor (props) {
        super(props);

        this.state = ({
            open: false,
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    onSubmit = (event) => {
        if (!event.target.checkValidity())
            return ;

        event.preventDefault();

        return this.props.loginFetchData('url', 'data');
    };

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

                    <Error msg="Invalid email or password." render={this.props.login.hasErrored}/>
                    <form className="login-form" onSubmit={this.onSubmit}>
                        <input type="email" placeholder="your email" required/>
                        <input type="password" placeholder="your password" minLength="5" required/>
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
        loginOnUnmountClean: () => dispatch(loginOnUnmountClean())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);