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

export function ratesFetchData (socket, data) {
    return ((dispatch) => {
        dispatch(ratesIsLoading(true));

        let test = [{
            num: 1,
            login: 'First',
            score: '432521'
        }];

        let session = window.sessionStorage.getItem('sessionRTG');
        socket.emit('rates', {session});

        socket.on('rates.fetched', (res) => {
            console.log('[+] RATES FETCHED : ', res);
            dispatch(ratesIsLoading(false));
            dispatch(ratesFetchDataSuccess(res));
        });

        // setTimeout(() => {
        //     dispatch(ratesIsLoading(false));
        //     dispatch(ratesFetchDataSuccess(test));
        // }, 5000)
    })
}