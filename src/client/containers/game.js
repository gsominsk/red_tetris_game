import React                    from 'react'
import { connect }              from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Game extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="play-container">
                <div className="play-wrap">
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