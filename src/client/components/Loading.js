import React, { Component, PropTypes } from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log('[+] this props : ', this.props);

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