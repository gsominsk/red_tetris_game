export function ratesHasError (bool) {
    return ({
        type: 'RATES_HAS_ERRORED',
        hasErrored: bool
    })
}

export function ratesIsLoading (bool) {
    return ({
        type: 'RATES_IS_LOADING',
        isLoading: bool
    })
}

export function ratesFetchDataSuccess (data) {
    return ({
        type: 'RATES_FETCH_DATA_SUCCESS',
        data
    })
}

export function ratesFetchData (socket) {
    return ((dispatch) => {
        dispatch(ratesIsLoading(true));

        let session = window.sessionStorage.getItem('sessionRTG');
        socket.emit('rates', {session});

        socket.on('rates.fetched', (res) => {
            dispatch(ratesIsLoading(false));
            dispatch(ratesFetchDataSuccess(res));
        });
    })
}