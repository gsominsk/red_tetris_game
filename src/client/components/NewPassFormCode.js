import React, { Component}  from 'react';
import PropTypes            from 'prop-types'

export default class NewPassFormCode extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        render  : PropTypes.bool,
    };

    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.render)
            return null;

        return (
            <form className="newpass-form-code" onSubmit={this.props.onSubmit} onChange={this.props.onChange}>
                <input name="code" type="text" placeholder="code" required/>
                <input name="password" className="newpass-password-input" type="password" placeholder="new password" minLength="5" required/>
                <input name="passwordRe" type="password" placeholder="repeat password" minLength="5" required/>
                <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
            </form>
        );
    }
}