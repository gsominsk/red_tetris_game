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

export function loginFetchData (url, data) {
    return ((dispatch) => {
        let login = {
            data: {
                login: 'login',
                password: 'password',
                successfully: true
            }
        };

        dispatch(login.data.successfully ? loginFetchDataSuccess(login.data) : loginHasErrored(true));
    })
}