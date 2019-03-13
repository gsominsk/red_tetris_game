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

export function ratesFetchData (url) {
    return ((dispatch) => {
        dispatch(ratesIsLoading(true));

        let test = [{
            num: 1,
            login: 'First',
            score: '432521'
        },{
            num: 2,
            login: 'Second',
            score: '25323'
        },{
            num: 3,
            login: 'Third',
            score: '65462'
        }];

        setTimeout(() => {
            dispatch(ratesIsLoading(false));
            dispatch(ratesFetchDataSuccess(test));
        }, 5000)
    })
}