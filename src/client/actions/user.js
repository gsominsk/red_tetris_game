export function userHasErrored (bool, string) {
    return ({
        type: 'USER_HAS_ERRORED',
        hasErrored: bool,
        errMsg: string
    })
}

export function userFetchDataSuccess (data) {
    return ({
        type: 'USER_FETCH_DATA_SUCCESS',
        success: data.success,
        successMsg: data.successMsg
    })
}

export function userOnUnmountClean () {
    return ({
        type: 'USER_ON_UNMOUNT_CLEAN',
    })
}

export function loginFetchData (socket, data) {
    return ((d) => {

        console.log('[+] login fetch data ', data);

        socket.emit('login', data);

        socket.on('login.fetched',(res) => {
            d(userOnUnmountClean());
            if (res.err)
                return d(userHasErrored(true, res.err));

            d(userFetchDataSuccess({success: true, successMsg: res.successMsg}));
        });
    })
}

export function registerFetchData (socket, data) {
    return ((d) => {
        socket.emit('register', data);

        socket.on('register.fetched', (res) => {
            d(userOnUnmountClean());
            if (res.err)
                return d(userHasErrored(true, res.err));

            d(userFetchDataSuccess(res));
        })
    })
}