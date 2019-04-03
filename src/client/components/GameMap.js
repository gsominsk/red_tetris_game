import React, { Component}  from 'react';
import PropTypes            from 'prop-types'

import Item     from './MapItem'

export const GameMapTest = () => {
    return (
        <GameMap/>
    )
}

export default class GameMap extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    // fillMap(cells) {
    //     let mapNum = this.props.player == 1 ? 0 : 200;
    //
    //     for (let i = 0; i < this.props.figures.length; i++) {
    //         let cell = cells[mapNum + this.props.figures[i].pos - 1];
    //         cell.classList.add(this.props.figures[i].color);
    //     }
    // }
    //
    // clearMap(cells) {
    //     for (let i = 0; i < 400; i++) {
    //         cells[i].classList.remove(
    //             'middle-blue',
    //             'blurple',
    //             'quince-jelly',
    //             'turbo',
    //             'june-bud',
    //             'steel-pink',
    //             'red'
    //         );
    //     }
    // }

    render () {
        let arr = [];
        for (let i = 0; i < 200; i++)
            for (let j = 0; j < this.props.figures.length; j++) {
                arr[i]= {color: ''};
                if (i == this.props.figures[j].pos) {
                    arr[i].color = this.props.figures[j].color;
                    break ;
                }
            }

        return (
            <div className="game-map">
                <div className="game-field">
                    {
                        arr.map((i, index) =>
                            <Item color={i.color} key={index}/>
                        )
                    }
                </div>
            </div>
        )
    }
}