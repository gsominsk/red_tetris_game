const initialState = {
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GAME_LOADING_ACTION':
            return {
                loading: action.loading
            }

        default:
            return state
    }
}