export const LOGIN_FETCH_DATA_SUCCESS   = 'LOGIN_FETCH_DATA_SUCCESS';
export const USER_FETCH_DATA_SUCCESS    = 'USER_FETCH_DATA_SUCCESS';
export const USER_ON_UNMOUNT_CLEAN      = 'USER_ON_UNMOUNT_CLEAN';
export const EMAIL_SENT_SUCCESS         = 'EMAIL_SENT_SUCCESS';
export const USER_HAS_ERRORED           = 'USER_HAS_ERRORED';
export const LOGOUT_SUCCESS             = 'LOGOUT_SUCCESS';

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
        successMsg: data.successMsg,
    })
}

export function loginFetchDataSuccess (data) {
    return ({
        type: 'LOGIN_FETCH_DATA_SUCCESS',
        success: data.success,
        successMsg: data.successMsg,
        session: data.session
    })
}

export function logOutSuccess () {
    return ({
        type: 'LOGOUT_SUCCESS'
    })
}

export function emailSentSuccess (data) {
    return ({
        type: 'EMAIL_SENT_SUCCESS',
        successMsg: data.successMsg,
        emailSent: data.emailSent,
        code: data.code,
        email: data.email
    })
}

export function userOnUnmountClean (data) {
    return ({
        type: 'USER_ON_UNMOUNT_CLEAN',
        session: data.session
    })
}

export function loginFetchData (socket, data) {
    return ((d) => {
        socket.emit('login', data);

        socket.on('login.fetched',(res) => {
            d(userOnUnmountClean({session: null}));
            if (res.err)
                return d(userHasErrored(true, res.err));

            window.sessionStorage.setItem('sessionRTG', res.session);

            d(loginFetchDataSuccess({success: true, successMsg: res.successMsg, session: res.session}));
        });
    })
}

export function logOutFetch(socket, data) {
    return ((d) => {
        socket.emit('logout', data);

        socket.on('logout.fetched', (res) => {
            window.sessionStorage.removeItem('sessionRTG');
            d(logOutSuccess())
        })
    })
}

export function registerFetchData (socket, data) {
    return ((d) => {
        socket.emit('register', data);

        socket.on('register.fetched', (res) => {
            d(userOnUnmountClean({session: null}));
            if (res.err)
                return d(userHasErrored(true, res.err));

            d(userFetchDataSuccess(res));
        })
    })
}

export function newPassEmailFetchData (socket, email) {
    return ((d) => {
        socket.emit('newpass.email', email);

        socket.on('newpass.email.success', (res) => {
            d(userOnUnmountClean({session: window.sessionStorage.getItem('sessionRTG')}));

            if (res.err)
                return d(userHasErrored(true, res.err));

            d(emailSentSuccess(res))
        })
    })
}

export function newPassResetFetchData (socket, email) {
    return ((d) => {
        socket.emit('newpass.reset', email);

        socket.on('newpass.reset.success', (res) => {
            d(userOnUnmountClean({session: window.sessionStorage.getItem('sessionRTG')}));

            if (res.err)
                return d(userHasErrored(true, res.err));

            d(userFetchDataSuccess(res))
        })
    })
}