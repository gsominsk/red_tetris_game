export function ratesHasErrored (state = false, action) {
    switch (action.type) {
        case 'RATES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function ratesIsLoading (state = false, action) {
    switch (action.type) {
        case 'RATES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function rates (state = [], action) {
    switch (action.type) {
        case 'RATES_FETCH_DATA_SUCCESS':
            return action.rates;

        default:
            return state;
    }
}