import React, { Component, PropTypes } from 'react';

export default class ClickButton extends Component {
    constructor (props) {
        super(props);
    }

    render (props) {
        console.log('[+] click button props : ', props);
        console.log('[+] click button props : ', this);
        return (
            <input
                type="button"
                autoFocus="true"
                // className={classnames('form-control', styles.addFriendInput)}
                value={this.props.placeholder}
                // onChange={this.handleChange.bind(this)}
                // onKeyDown={this.handleSubmit.bind(this)}
            />
        );
    }

}