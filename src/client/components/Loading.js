import React, { Component}  from 'react';
import PropTypes            from 'prop-types'
import Error from "./Error";

export const LoadingTest = () => {
    return (
        <Loading/>
    )
}

export default class Loading extends Component {
    static propTypes = {
        loading         : PropTypes.bool,
        alreadyLoaded   : PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.loading || this.props.alreadyLoaded)
            return (<div></div>);

        return (
            <div contentEditable={false} className="loading-container">
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