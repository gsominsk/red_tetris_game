import React                    from 'react'
import { connect }              from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SideMenu from './sidemenu'

class Game extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    render () {
        return (
            <div className="play-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`play-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <div className="player-wrap player-one-wrap">
                        <div className="player-info">
                            <div className="player-login">
                                Some Login
                            </div>
                            <div className="player-score">
                                10000
                            </div>
                        </div>
                        <div className="game-map">
                            <div className="game-field">
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                            </div>
                        </div>
                    </div>
                    <div className="player-wrap player-two-wrap">
                        <div className="player-info">
                            <div className="player-login">
                                Some Login
                            </div>
                            <div className="player-score">
                                10000
                            </div>
                        </div>
                        <div className="game-map">
                            <div className="game-field">
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>
                                <div className="gf-item"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        game: state.game
    }
}

export default connect(mapStateToProps, null)(Game);