export function loginHasErrored (state = false, action) {
    switch (action.type) {
        case 'LOGIN_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function login (state = {}, action) {
    switch (action.type) {
        case 'LOGIN_FETCH_DATA_SUCCESS':
            return action.login;

        default:
            return state;
    }
}