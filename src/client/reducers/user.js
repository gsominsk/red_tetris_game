const initialState = {
    hasErrored: false,
    errMsg: null,
    success: false,
    successMsg: null
};

export default function user (state = initialState, action) {
    switch (action.type) {
        case 'USER_FETCH_DATA_SUCCESS':
            return {
                ...state,
                success: action.success,
                successMsg: action.successMsg
            };

        case 'USER_ON_UNMOUNT_CLEAN':
            return {
                ...initialState
            };

        case 'USER_HAS_ERRORED':
            return {
                ...state,
                hasErrored: action.hasErrored,
                errMsg: action.errMsg
            };

        default:
            return state;
    }
}