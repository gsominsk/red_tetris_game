const initialState = {
    hasErrored: false,
    errMsg: null,
    success: false,
    successMsg: null
};

export default function register (state = initialState, action) {
    switch (action.type) {
        case 'REGISTER_FETCH_DATA_SUCCESS':
            return {
                ...state,
                success: action.success,
                successMsg: action.successMsg
            };

        case 'REGISTER_HAS_ERRORED':
            return {
                ...state,
                hasErrored: action.hasErrored,
                errMsg: action.errMsg
            };

        case 'REGISTER_ON_UNMOUNT_CLEAN':
            return {
                ...initialState
            };

        default:
            return state;
    }
}