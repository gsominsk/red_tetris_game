const initialState = {
    loading: false,
    disconnected: false,
    firstPlayer: {
        login: 'Anonymous',
        score: 0,
        figures: []
    },
    secondPlayer: {
        login: 'Anonymous',
        score: 0,
        figures: []
    },
    gameKey: ''
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
                firstPlayer: {
                    login: action.firstPlayer.login,
                    score: action.firstPlayer.score,
                    figures: action.firstPlayer.figures
                },
                secondPlayer: {
                    login: action.secondPlayer.login,
                    score: action.secondPlayer.score,
                    figures: action.secondPlayer.figures
                },
                gameKey: action.gameKey
            };

        case 'GAME_UPDATE_SUCCESS':
            return {
                ...state,
                firstPlayer: {
                    login: state.firstPlayer.login,
                    score: state.firstPlayer.score,
                    figures: action.firstPlayer.figures
                },
                secondPlayer: {
                    login: state.secondPlayer.login,
                    score: state.secondPlayer.score,
                    figures: action.secondPlayer.figures
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