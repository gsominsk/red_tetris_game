const initialState = {
    hasErrored: false,
    errMsg: null,
    success: false,
    successMsg: null,
    session: null,
    resetPass: {
        emailSent: false,
        code: null,
        email: null
    }
};

export default function user (state = initialState, action) {
    switch (action.type) {
        case 'USER_FETCH_DATA_SUCCESS':
            return {
                ...state,
                success: action.success,
                successMsg: action.successMsg
            };

        case 'LOGIN_FETCH_DATA_SUCCESS':
            return {
                ...state,
                success: action.success,
                successMsg: action.successMsg,
                session: action.session
            };

        case 'RESET_PASS_FETCH_DATA_SUCCESS':
            return {
                ...state,
                success: action.success,
                successMsg: action.successMsg
            };

        case 'EMAIL_SENT_SUCCESS':
            return {
                ...state,
                successMsg: action.successMsg,
                resetPass: {
                    emailSent: action.emailSent,
                    code: action.code,
                    email: action.email
                }
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