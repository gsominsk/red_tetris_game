import React                    from 'react'
import { connect }              from 'react-redux'

import SideMenu from './sidemenu'

import {
    findGame,
    disconnectGame,
    onUnmountClean
}               from "../actions/game";

import Io       from '../components/Socket'
import Loading  from '../components/Loading'
import GameMap  from '../components/GameMap'

class Game extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false
        });
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    restartGame = () => {
        console.log('restart game btn click')
        this.props.onUnmountClean();
        this.props.findGame(Io.socket);
    };

    check = () => {
        console.log('check')
    };

    handleKeyPress = (event) => {
        event.preventDefault();
        console.log('[+] KEY PRESS EVENT : ', event.key)
    };

    componentDidMount() {
        this.props.findGame(Io.socket)
    }

    componentWillMount() {
        this.props.onUnmountClean();
    }

    componentWillUnmount() {
        this.props.disconnectGame(Io.socket);
    }

    render () {
        console.log('[+] GAME | props : ', this.props);

        return (
            <div className="play-container" contentEditable={true} suppressContentEditableWarning={true} onKeyUp={this.handleKeyPress}>
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />

                <Loading alreadyLoaded={false} loading={this.props.game.loading}/>
                <div contentEditable={false} className={`disconnection-msg ${this.props.game.disconnected ? '' : 'hide'}`}>
                    PLAYER HAS DISCONNECTED.<br/>
                    YOU WIN.<br/>
                    <div className="restart-game-btn" onClick={this.restartGame}>RESTART?</div>
                </div>
                <div contentEditable={false} className={`play-wrap ${this.state.open || this.props.game.loading || this.props.game.disconnected ? 'opacity-zero-point-two' : ''}`}>
                    <div className="player-wrap player-one-wrap">
                        <div className="player-info">
                            <div className="player-login">
                                {this.props.game.secondPlayer.login}
                            </div>
                            <div className="player-score">
                                {this.props.game.secondPlayer.score}
                            </div>
                        </div>
                        <GameMap figures={this.props.game.secondPlayer.figures} player={2}/>
                    </div>
                    <div className="player-wrap player-two-wrap">
                        <div className="player-info">
                            <div className="player-login">
                                {this.props.game.firstPlayer.login}
                            </div>
                            <div className="player-score">
                                {this.props.game.firstPlayer.score}
                            </div>
                        </div>
                        <GameMap figures={this.props.game.firstPlayer.figures} player={1}/>
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
        disconnectGame: (socket) => d(disconnectGame(socket)),
        onUnmountClean: () => d(onUnmountClean())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);