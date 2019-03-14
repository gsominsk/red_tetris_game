import React, { Component}  from 'react';
import PropTypes            from 'prop-types'

export default class NewPassFormEmail extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        render  : PropTypes.bool
    }

    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.render)
            return null;

        return (
            <form className="newpass-form-email" onSubmit={this.props.onSubmit}>
                <input type="email" placeholder="email" required/>
                <input type="submit" name="submit" placeholder="submit" value="SUBMIT"/>
            </form>
        );
    }
}