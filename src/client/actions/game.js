export function gameSuccessLoaded (data) {
    return ({
        type: 'GAME_SUCCESS_LOADED',
        loading: false,
        disconnected: false,
        userInfo: {
            login: data.userInfo.login,
            score: data.userInfo.score
        },
        enemyInfo: {
            login: data.enemyInfo.login,
            score: data.enemyInfo.score
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

export function findGame (socket) {
    return ((d) => {
        let sessionKey = window.sessionStorage.getItem('sessionRTG') || false;

        socket.emit('game.find', {sessionKey});

        socket.on('game.find.success', (res) => {
            console.log('[+] GAME FOUND SUCCESS : ', res);
            d(gameSuccessLoaded(res));
        });

        socket.on('game.find.loading', (res) => {
            d(gameIsLoading(res.loading));
        });

        socket.on('game.disconnect', (res) => {
            d(gameDisconnectionAction(res.disconnected));
        });
    })
}