const initialState = {
    hasErrored: false,
    register: {}
};

export default function login (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_FETCH_DATA_SUCCESS':
            return {
                ...state,
                login: action.login
            };

        case 'LOGIN_HAS_ERRORED':
            return {
                ...state,
                hasErrored: action.hasErrored
            };

        default:
            return state;
    }
}