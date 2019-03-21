const initialState = {
    loading: false,
    disconnected: false,
    userInfo: {
        login: 'Anonymous',
        score: 0
    },
    enemyInfo: {
        login: 'Anonymous',
        score: 0
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GAME_LOADING_ACTION':
            return {
                ...state,
                loading: action.loading
            };

        case 'GAME_DISCONNECTION_ACTION':
            return {
                ...state,
                disconnected: action.disconnected
            };

        case 'GAME_SUCCESS_LOADED':
            return {
                ...state,
                loading: action.loading,
                disconnected: action.disconnected,
                userInfo: {
                    login: action.userInfo.login,
                    score: action.userInfo.score
                },
                enemyInfo: {
                    login: action.enemyInfo.login,
                    score: action.enemyInfo.score
                }
            };

        case 'ON_UNMOUNT_CLEAN':
            return {
                ...initialState
            };

        default:
            return state
    }
}