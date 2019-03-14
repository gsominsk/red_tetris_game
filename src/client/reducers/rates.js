const initialState = {
    hasErrored: false,
    isLoading: false,
    data: []
};

export default function rates (state = initialState, action) {
    switch (action.type) {
        case 'RATES_FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.data
            };

        case 'RATES_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };

        case 'RATES_HAS_ERRORED':
            return {
                ...state,
                hasErrored: action.hasErrored
            };

        default:
            return state;
    }
}