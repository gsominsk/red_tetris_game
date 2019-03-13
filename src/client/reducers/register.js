const initialState = {
    hasErrored: false,
    data: {}
};

export default function register (state = initialState, action) {
    switch (action.type) {
        case 'REGISTER_FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.data
            };

        case 'REGISTER_HAS_ERRORED':
            return {
                ...state,
                hasErrored: action.hasErrored
            };

        case 'REGISTER_ON_UNMOUNT_CLEAN':
            return {
                ...initialState
            };

        default:
            return state;
    }
}