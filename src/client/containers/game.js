import React                    from 'react'
import { connect }              from 'react-redux'

import SideMenu from './sidemenu'

import {
    findGame,
    onUnmountClean
}               from "../actions/game";

import Io       from '../components/Socket'
import Loading  from '../components/Loading'

class Game extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    componentDidMount() {
        this.props.findGame(Io.socket)
    }

    componentWillUnmount() {
        this.props.onUnmountClean();
    }

    render () {
        console.log('[+] GAME | props : ', this.props);
        return (
            <div className="play-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <Loading alreadyLoaded={false} loading={this.props.game.loading}/>
                <div className={`play-wrap ${this.state.open || this.props.game.loading ? 'opacity-zero-point-two' : ''}`}>
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

const mapDispatchToProps = (d) => {
    return {
        findGame: (socket) => d(findGame(socket)),
        onUnmountClean: () => d(onUnmountClean())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);