import React, { Component}  from 'react';
import PropTypes            from 'prop-types'

export default class Success extends Component {
    static propTypes = {
        render  : PropTypes.bool,
        msg     :  PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.render)
            return null;

        return (
            <div className="success-msg">
                {this.props.msg}
            </div>
        );
    }
}