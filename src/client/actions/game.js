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

export function findGame (socket) {
    return ((d) => {
        let sessionKey = window.sessionStorage.getItem('sessionRTG') || false;

        socket.emit('game.find', {sessionKey});

        socket.on('game.find.success', (res) => {
            console.log('[+] GAME FOUND SUCCESS : ', res);
            d(gameSuccessLoaded(res));
        });

        socket.on('game.start.success', (res) => {
            socket.emit('game.start', {gameKey: res.gameKey});
        });

        socket.on('game.update.success', (res) => {
            console.log('[+] GAME UPDATE SUCCESS : ', res);
            d(gameUpdateSuccess(res));
        });

        socket.on('game.find.loading', (res) => {
            d(gameIsLoading(res.loading));
        });

        socket.on('game.disconnect', (res) => {
            d(gameDisconnectionAction(res.disconnected));
        });
    })
}

export function disconnectGame (socket) {
    return ((d) => {
        socket.emit('game.disconnect.push');
    })
}

export function gameStart (socket) {
    return ((d) => {

    })
}