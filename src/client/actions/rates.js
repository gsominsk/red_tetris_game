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

export function ratesFetchDataSuccess (rates) {
    return ({
        type: 'RATES_FETCH_DATA_SUCCESS',
        rates
    })
}

export function ratesFetchData (url) {
    return ((dispatch) => {
        dispatch(ratesIsLoading(true));

        let test = [1, 2, 3];

        setTimeout(() => {
            dispatch(ratesIsLoading(false));
            dispatch(ratesFetchDataSuccess(test));
        }, 5000)
    })
}