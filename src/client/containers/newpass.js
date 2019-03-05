import React                    from 'react'
import { connect }              from 'react-redux'

import { Route, Link } from "react-router-dom";
import SideMenu from './sidemenu'

class NewPass extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="newpass-container">
                <SideMenu/>
                <div className="newpass-wrap">
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