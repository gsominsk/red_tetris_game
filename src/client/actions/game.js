export const GAME_SUCCESS_LOADED = 'GAME_SUCCESS_LOADED';
export const SINGLE_GAME_SUCCESS_LOADED = 'SINGLE_GAME_SUCCESS_LOADED';
export const GAME_UPDATE_SUCCESS = 'GAME_UPDATE_SUCCESS';
export const SINGLE_GAME_UPDATE_SUCCESS = 'SINGLE_GAME_UPDATE_SUCCESS';
export const ON_UNMOUNT_CLEAN = 'ON_UNMOUNT_CLEAN';
export const GAME_LOADING_ACTION = 'GAME_LOADING_ACTION';
export const GAME_DISCONNECTION_ACTION = 'GAME_DISCONNECTION_ACTION';
export const GAME_END = 'GAME_END';
export const GAME_NOT_FOUND = 'GAME_NOT_FOUND';

export function gameSuccessLoaded (data) {
    return ({
        type: 'GAME_SUCCESS_LOADED',
        loading: false,
        disconnected: false,
        firstPlayer: {
            login: data.firstPlayer.login,
            score: data.firstPlayer.score,
            figures: data.firstPlayer.figures
        },
        secondPlayer: {
            login: data.secondPlayer.login,
            score: data.secondPlayer.score,
            figures: data.secondPlayer.figures
        },
        gameKey: data.gameKey
    })
}

export function singleGameSuccessLoaded (data) {
    return ({
        type: 'SINGLE_GAME_SUCCESS_LOADED',
        loading: false,
        disconnected: false,
        firstPlayer: {
            login: data.firstPlayer.login,
            score: data.firstPlayer.score,
            figures: data.firstPlayer.figures
        },
        gameKey: data.gameKey
    })
}

export function gameUpdateSuccess (data) {
    return ({
        type: 'GAME_UPDATE_SUCCESS',
        firstPlayer: {
            figures: data.firstPlayer.figures
        },
        secondPlayer: {
            figures: data.secondPlayer.figures
        },
    })
}

export function singleGameUpdateSuccess (data) {
    return ({
        type: 'SINGLE_GAME_UPDATE_SUCCESS',
        firstPlayer: {
            figures: data.firstPlayer.figures
        }
    })
}

export function onUnmountClean () {
    return ({
        type: 'ON_UNMOUNT_CLEAN'
    })
}

export function gameIsLoading (bool) {
    return ({
        type: 'GAME_LOADING_ACTION',
        loading: bool
    })
}

export function gameDisconnectionAction (bool) {
    return ({
        type: 'GAME_DISCONNECTION_ACTION',
        disconnected: bool
    })
}

export function gameEnd (data) {
    return ({
        type: 'GAME_END',
        end: data.end,
        endGameMsg: data.msg
    })
}

export function gameNotFound (data) {
    return ({
        type: 'GAME_NOT_FOUND',
        gameNotFound: data.notFound,
        gameNotFoundMsg: data.msg
    })
}

export function findGame (socket, data) {
    return ((d) => {
        let sessionKey = window.sessionStorage.getItem('sessionRTG') || false;
        let hash = data.hash;


        // console.log('[+] window location : ', window.location);
        // console.log('[+] window location hash: ', window.location.hash);
        // console.log('[+] location href : ', location.href);

        socket.emit('game.find', {sessionKey, hash});

        socket.on('game.notfound', (res) => {
            d(gameNotFound(res));
        });

        socket.on('game.find.success', (res) => {
            window.location.hash = res.hash;
            d(gameSuccessLoaded(res));
        });

        socket.on('game.start.success', (res) => {
            socket.emit('game.start', {gameKey: res.gameKey});
        });

        socket.on('game.update.success', (res) => {
            d(gameUpdateSuccess(res));
        });

        socket.on('game.find.loading', (res) => {
            window.location.hash = res.hash;
            d(gameIsLoading(res.loading));
        });

        socket.on('game.end', (res) => {
            console.log('[+] socket id : ', socket.id);
            res.msg = res.winner == socket.id ? 'You win.' : 'You loose.';
            d(gameEnd(res))
        });

        socket.on('game.disconnect', (res) => {
            d(gameDisconnectionAction(res.disconnected));
        });
    })
}

export function figureMove (socket, data) {
    return ((d) => {
        socket.emit('game.move', data);
    })
}

export function disconnectGame (socket) {
    return ((d) => {
        socket.emit('game.disconnect.push');
    })
}

export function createGame (socket) {
    return ((d) => {
        let sessionKey = window.sessionStorage.getItem('sessionRTG') || false;

        socket.emit('single.game.create', {sessionKey});

        socket.on('single.game.created', (res) => {
            d(singleGameSuccessLoaded(res));
        });

        socket.on('single.game.start.success', (res) => {
            console.log('[+] SINGLE GAME START SUCCESS')
            socket.emit('single.game.start', {gameKey: res.gameKey});
        });

        socket.on('single.game.update.success', (res) => {
            d(singleGameUpdateSuccess(res));
        });

        socket.on('single.game.end', (res) => {
            res.msg = 'You loose.';
            d(gameEnd(res))
        });

        socket.on('game.disconnect', (res) => {
            d(gameDisconnectionAction(res.disconnected));
        });
    })
 }

export function disconnectSingleGame (socket) {
    return ((d) => {
        socket.emit('single.game.disconnect.push');
    })
}

export function singleFigureMove (socket, data) {
    return ((d) => {
        socket.emit('single.game.move', data);
    })
}