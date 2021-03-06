import React                    from 'react'
import { connect }              from 'react-redux'

import SideMenu from './sidemenu'

import {
    findGame,
    disconnectGame,
    figureMove,
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
        this.props.findGame(Io.socket, {hash: ''});
    };

    check = () => {
        console.log('check')
    };

    handleKeyPress = (event) => {
        event.preventDefault();

        let validKeys = [
            ' ',
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown'
        ];

        let valid = false;
        for (let i = 0; i < validKeys.length; i++) {
            if (event.key == validKeys[i]) {
                valid = true;
                break ;
            }
        }

        if (valid) {
            this.props.figureMove(Io.socket, {gameKey: this.props.game.gameKey, move: event.key});
        }
    };

    componentDidMount() {
        this.props.findGame(Io.socket, {hash: this.props.location.hash})
    }

    componentWillMount() {
        this.props.onUnmountClean({session: window.sessionStorage.getItem('sessionRTG')});
    }

    componentWillUnmount() {
        this.props.location.hash = '';
        this.props.onUnmountClean({session: window.sessionStorage.getItem('sessionRTG')});
        this.props.disconnectGame(Io.socket);
    }

    render () {
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
                    <div className="restart-game-btn" onClick={this.restartGame}>START NEW</div>
                </div>
                <div contentEditable={false} className={`disconnection-msg ${this.props.game.end ? '' : 'hide'}`}>
                    {this.props.game.endGameMsg}
                    <div className="restart-game-btn" onClick={this.restartGame}>START NEW</div>
                </div>
                <div contentEditable={false} className={`disconnection-msg ${this.props.game.gameNotFound ? '' : 'hide'}`}>
                    {this.props.game.gameNotFoundMsg}
                    <div className="restart-game-btn" onClick={this.restartGame}>FIND RAND GAME</div>
                </div>
                <div contentEditable={false}
                     className={`play-wrap ${
                         this.state.open ||
                         this.props.game.loading ||
                         this.props.game.disconnected ||
                         this.props.game.end ||
                         this.props.game.gameNotFound ? 'opacity-zero-point-two' : ''}`}>
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
        findGame: (socket, data) => d(findGame(socket, data)),
        disconnectGame: (socket) => d(disconnectGame(socket)),
        figureMove: (socket, move) => d(figureMove(socket, move)),
        onUnmountClean: () => d(onUnmountClean())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);