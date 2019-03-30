import React                    from 'react'
import { connect }              from 'react-redux'

import SideMenu from './sidemenu'

import {
    createGame,
    disconnectSingleGame,
    singleFigureMove,
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
        this.props.createGame(Io.socket);
    };

    check = () => {
        console.log('check')
    };

    handleKeyPress = (event) => {
        event.preventDefault();
        console.log('[+] KEY PRESS EVENT : ', event.key)

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
            this.props.singleFigureMove(Io.socket, {gameKey: this.props.game.gameKey, move: event.key});
        }
    };

    componentDidMount() {
        this.props.createGame(Io.socket)
    }

    componentWillMount() {
        this.props.onUnmountClean();
    }

    componentWillUnmount() {
        this.props.onUnmountClean();
        this.props.disconnectSingleGame(Io.socket);
    }

    render () {
        return (
            <div className="play-container singleplayer" contentEditable={true} suppressContentEditableWarning={true} onKeyUp={this.handleKeyPress}>
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />

                <Loading alreadyLoaded={false} loading={this.props.game.loading}/>
                <div contentEditable={false} className={`disconnection-msg ${this.props.game.end ? '' : 'hide'}`}>
                    {this.props.game.endGameMsg}
                </div>
                <div contentEditable={false} className={`play-wrap ${this.state.open || this.props.game.loading || this.props.game.disconnected || this.props.game.end ? 'opacity-zero-point-two' : ''}`}>
                    <div className="player-wrap player-one-wrap">
                        <div className="player-info">
                            <div className="player-login">
                                {this.props.game.firstPlayer.login}
                            </div>
                            <div className="player-score">
                                {this.props.game.firstPlayer.score}
                            </div>
                        </div>
                        <GameMap figures={this.props.game.firstPlayer.figures} player={2}/>
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
        createGame: (socket) => d(createGame(socket)),
        disconnectSingleGame: (socket) => d(disconnectSingleGame(socket)),
        singleFigureMove: (socket, move) => d(singleFigureMove(socket, move)),
        onUnmountClean: () => d(onUnmountClean())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);