export function gameHasErrored (bool) {
    return ({
        type: 'GAME_HAS_ERRORED',
        hasErrored: bool
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

export function findGame (socket) {
    return ((d) => {
        let sessionKey = window.sessionStorage.getItem('sessionRTG') || false;

        socket.emit('game.find', {sessionKey});

        socket.on('game.find.success', (res) => {
            if (res && res.loading)
                d(gameIsLoading(true));
        })
    })
}