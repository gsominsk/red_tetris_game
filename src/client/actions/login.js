export function loginHasErrored (bool) {
    return ({
        type: 'LOGIN_HAS_ERRORED',
        hasErrored: bool
    })
}

export function loginFetchDataSuccess (data) {
    return ({
        type: 'LOGIN_FETCH_DATA_SUCCESS',
        data
    })
}

export function loginOnUnmountClean () {
    return ({
        type: 'LOGIN_ON_UNMOUNT_CLEAN',
    })
}

export function loginFetchData (socket, data) {
    return ((dispatch) => {

        socket.emit('check', data);

        socket.on('checkSuccess',(res)=>{
            console.log('[+] LOGIN | CHECKSUCCESS | res : ', res);
        });

        // dispatch(login.data.successfully ? loginFetchDataSuccess(login.data) : loginHasErrored(true));
    })
}