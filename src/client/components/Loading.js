import React, { Component}  from 'react';
import PropTypes            from 'prop-types'

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.loading || this.props.alreadyLoaded)
            return (<div></div>);

        return (
            <div className="loading-container">
                <div className="loading-wrap">
                    loading
                    <span>
                        ...
                    </span>
                </div>
            </div>
        );
    }
}

Loading.propTypes = {
    loading         : PropTypes.bool,
    alreadyLoaded   : PropTypes.bool
};