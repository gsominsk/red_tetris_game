export function registerHasErrored (bool, string) {
    return ({
        type: 'REGISTER_HAS_ERRORED',
        hasErrored: bool,
        errMsg: string
    })
}

export function registerFetchDataSuccess (data) {
    return ({
        type: 'REGISTER_FETCH_DATA_SUCCESS',
        data
    })
}

export function registerOnUnmountClean () {
    return ({
        type: 'REGISTER_ON_UNMOUNT_CLEAN'
    })
}

export function registerFetchData (socket, data) {
    return ((dispatch) => {
        console.log('[+] registerFetchData : ', data);

        socket.emit('register', data);

        socket.on('register.fetched', (err, res) => {
            if (err)
                registerHasErrored(true, err);
        })
    })
}