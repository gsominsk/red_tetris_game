const initialState = {
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GAME_LOADING_ACTION':
            return {
                loading: action.loading
            }

        case 'ON_UNMOUNT_CLEAN':
            return {
                ...initialState
            }

        default:
            return state
    }
}