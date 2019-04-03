import React, { Component}  from 'react';
import PropTypes            from 'prop-types'

export const MapItemTest = () => {
    return (
        <GameItem/>
    )
}

export default class GameItem extends Component {
    render () {
        return (
            <div className={`gf-item ${this.props.color}`}></div>
        )
    }
}