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
        success: data.success,
        successMsg: data.successMsg
    })
}

export function registerOnUnmountClean () {
    return ({
        type: 'REGISTER_ON_UNMOUNT_CLEAN'
    })
}

export function registerFetchData (socket, data) {
    return ((d) => {
        socket.emit('register', data);

        socket.on('register.fetched', (res) => {
            d(registerOnUnmountClean());
            if (!res || res.err)
                return d(registerHasErrored(true, res.err));

            d(registerFetchDataSuccess(res));
        })
    })
}