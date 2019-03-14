export function newPassHasErrored (bool) {
    return ({
        type: 'NEWPASS_HAS_ERRORED',
        hasErrored: bool
    })
}

export function newPassFetchDataSuccess (data) {
    return ({
        type: 'NEWPASS_FETCH_DATA_SUCCESS',
        data
    })
}

export function newPassOnUnmountClean () {
    return ({
        type: 'NEWPASS_ON_UNMOUNT_CLEAN'
    })
}

export function newPassFetchData (url, data) {
    return ((dispatch) => {
        let newpass = {
            data: {
                emailSent: true
            }
        };

        dispatch(newpass.data ? newPassFetchDataSuccess(newpass.data) : newPassHasErrored(true));
    })
}