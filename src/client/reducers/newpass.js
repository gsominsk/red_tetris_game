const initialState = {
    hasErrored: false,
    data: {
        emailSent: true
    }

};

export default function newpass (state = initialState, action) {
    switch (action.type) {
        case 'NEWPASS_FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.data
            };

        case 'NEWPASS_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };

        case 'NEWPASS_ON_UNMOUNT_CLEAN':
            return {
                ...initialState
            };

        case 'NEWPASS_HAS_ERRORED':
            return {
                ...state,
                hasErrored: action.hasErrored
            };

        default:
            return state;
    }
}
