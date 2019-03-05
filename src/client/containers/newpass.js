import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link } from "react-router-dom";
import SideMenu from './sidemenu'

class NewPass extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    render () {
        return (
            <div className="newpass-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`newpass-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="newpass-info">FORGOT PASSWORD</div>
                    <input type="text" placeholder="code"/>
                    <input type="password" placeholder="new password"/>
                    <input type="password" placeholder="repeat password"/>
                    <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
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

export default connect(mapStateToProps, null)(NewPass);