export function registerHasErrored (bool) {
    return ({
        type: 'REGISTER_HAS_ERRORED',
        hasErrored: bool
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

export function registerFetchData (url, data) {
    return ((dispatch) => {
        let register = {
            data: {
                successfully: true
            }
        };

        dispatch(register.data.successfully ? registerFetchDataSuccess(register.data) : registerHasErrored(true));
    })
}