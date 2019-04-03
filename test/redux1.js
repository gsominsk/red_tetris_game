import {configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'

import {
    LOGIN_FETCH_DATA_SUCCESS,
    loginFetchDataSuccess,

    USER_FETCH_DATA_SUCCESS,
    userFetchDataSuccess,

    USER_ON_UNMOUNT_CLEAN,
    userOnUnmountClean,

    EMAIL_SENT_SUCCESS,
    emailSentSuccess,

    USER_HAS_ERRORED,
    userHasErrored,

    LOGOUT_SUCCESS,
    logOutSuccess
} from '../src/client/actions/user'

import {
    RATES_HAS_ERRORED,
    ratesHasError,

    RATES_IS_LOADING,
    ratesIsLoading,

    RATES_FETCH_DATA_SUCCESS,
    ratesFetchDataSuccess
} from '../src/client/actions/rates'

import {
    GAME_SUCCESS_LOADED,
    gameSuccessLoaded,

    SINGLE_GAME_SUCCESS_LOADED,
    singleGameSuccessLoaded,

    GAME_UPDATE_SUCCESS,
    gameUpdateSuccess,

    SINGLE_GAME_UPDATE_SUCCESS,
    singleGameUpdateSuccess,

    ON_UNMOUNT_CLEAN,
    onUnmountClean,

    GAME_LOADING_ACTION,
    gameIsLoading,

    GAME_DISCONNECTION_ACTION,
    gameDisconnectionAction,

    GAME_END,
    gameEnd,

    GAME_NOT_FOUND,
    gameNotFound
} from '../src/client/actions/game'

import chai from "chai"

const MESSAGE_GAME_SUCCESS_LOADED = {
    loading: false,
    disconnected: false,
    firstPlayer: {
        login: 'test',
        score: 'test',
        figures: 'test'
    },
    secondPlayer: {
        login: 'test',
        score: 'test',
        figures: 'test'
    },
    gameKey: 'test'
};

const MESSAGE_SINGLE_GAME_SUCCESS_LOADED = {
    loading: false,
    disconnected: false,
    firstPlayer: {
        login: 'test',
        score: 'test',
        figures: 'test'
    },
    gameKey: 'test'
};

const MESSAGE_GAME_UPDATE_SUCCESS = {
    firstPlayer: {
        figures: 'test'
    },
    secondPlayer: {
        figures: 'test'
    },

};

const MESSAGE_SINGLE_GAME_UPDATE_SUCCESS = {
    firstPlayer: {
        figures: 'test'
    }
};

const MESSAGE_ON_UNMOUNT_CLEAN = {
};

const MESSAGE_GAME_LOADING_ACTION = {
    loading: 'test'
};

const MESSAGE_GAME_DISCONNECTION_ACTION = {
    disconnected: 'test'
};

const MESSAGE_GAME_END = {
    end: 'test',
    msg: ''
};

const MESSAGE_GAME_NOT_FOUND = {
    notFound: false,
    msg: 'test'
};

const MESSAGE_RATES_HAS_ERROR = {
    hasErrored: 'test'
};

const MESSAGE_RATES_IS_LOADING = {
    isLoading: 'test'
};

const MESSAGE_RATES_FETCH_DATA_SUCCESS = {
    data: 'test'
};

const MESSAGE_LOGIN_FETCH_DATA_SUCCESS = {
    success: 'test',
    successMsg: 'test',
    session: 'test'
};

const MESSAGE_USER_ON_UNMOUNT_CLEAN = {
    session: 'test'
};

const MESSAGE_EMAIL_SENT_SUCCESS = {
    successMsg: 'test',
    emailSent: 'test',
    code: 'test',
    email: 'test'
};

const MESSAGE_USER_FETCH_DATA_SUCCESS = {
    success: 'test',
    successMsg: 'test',
};

const MESSAGE_USER_HAS_ERRORED = {
    bool: true,
    errMsg: 'err'
};

chai.should();

describe('User redux test', function(){
    it('should write user has errored', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            USER_HAS_ERRORED: ({dispatch, getState}) =>  {
                const state = getState();
                state.user.hasErrored.should.equal(MESSAGE_USER_HAS_ERRORED.bool);
                state.user.errMsg.should.equal(MESSAGE_USER_HAS_ERRORED.errMsg);
                done()
            }
        });

        store.dispatch(userHasErrored(MESSAGE_USER_HAS_ERRORED.bool, MESSAGE_USER_HAS_ERRORED.errMsg));
    });

    it('should write log out success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            LOGOUT_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                done()
            }
        });

        store.dispatch(logOutSuccess());
    });

    it('should write email sent success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            EMAIL_SENT_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                state.user.successMsg.should.equal(MESSAGE_EMAIL_SENT_SUCCESS.successMsg);
                state.user.resetPass.emailSent.should.equal(MESSAGE_EMAIL_SENT_SUCCESS.emailSent);
                state.user.resetPass.code.should.equal(MESSAGE_EMAIL_SENT_SUCCESS.code);
                state.user.resetPass.email.should.equal(MESSAGE_EMAIL_SENT_SUCCESS.email);
                done()
            }
        });

        store.dispatch(emailSentSuccess(MESSAGE_EMAIL_SENT_SUCCESS));
    });

    it('should write user on unmount clean', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            USER_ON_UNMOUNT_CLEAN: ({dispatch, getState}) =>  {
                const state = getState();
                state.user.session.should.equal(MESSAGE_USER_ON_UNMOUNT_CLEAN.session);
                done()
            }
        });

        store.dispatch(userOnUnmountClean(MESSAGE_USER_ON_UNMOUNT_CLEAN));
    });

    it('should write user fetch data success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            USER_FETCH_DATA_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                state.user.success.should.equal(MESSAGE_USER_FETCH_DATA_SUCCESS.success);
                state.user.successMsg.should.equal(MESSAGE_USER_FETCH_DATA_SUCCESS.successMsg);
                done()
            }
        });

        store.dispatch(userFetchDataSuccess(MESSAGE_USER_FETCH_DATA_SUCCESS));
    });

    it('should write user fetch data success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            LOGIN_FETCH_DATA_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                state.user.success.should.equal(MESSAGE_LOGIN_FETCH_DATA_SUCCESS.success);
                state.user.successMsg.should.equal(MESSAGE_LOGIN_FETCH_DATA_SUCCESS.successMsg);
                state.user.session.should.equal(MESSAGE_LOGIN_FETCH_DATA_SUCCESS.session);
                done()
            }
        });

        store.dispatch(loginFetchDataSuccess(MESSAGE_LOGIN_FETCH_DATA_SUCCESS));
    });

    it('should write rates has error', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            RATES_HAS_ERRORED: ({dispatch, getState}) =>  {
                const state = getState();
                state.rates.hasErrored.should.equal(MESSAGE_RATES_HAS_ERROR.hasErrored);
                done()
            }
        });

        store.dispatch(ratesHasError(MESSAGE_RATES_HAS_ERROR.hasErrored));
    });

    it('should write rates is loading', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            RATES_IS_LOADING: ({dispatch, getState}) =>  {
                const state = getState();
                state.rates.isLoading.should.equal(MESSAGE_RATES_IS_LOADING.isLoading);
                done()
            }
        });

        store.dispatch(ratesIsLoading(MESSAGE_RATES_IS_LOADING.isLoading));
    });

    it('should write rates data fetch success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            RATES_FETCH_DATA_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                state.rates.data.should.equal(MESSAGE_RATES_FETCH_DATA_SUCCESS.data);
                done()
            }
        });

        store.dispatch(ratesFetchDataSuccess(MESSAGE_RATES_FETCH_DATA_SUCCESS.data));
    });

    it('should write game success loaded', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            GAME_SUCCESS_LOADED: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.loading.should.equal(MESSAGE_GAME_SUCCESS_LOADED.loading);
                state.game.disconnected.should.equal(MESSAGE_GAME_SUCCESS_LOADED.disconnected);
                state.game.gameKey.should.equal(MESSAGE_GAME_SUCCESS_LOADED.gameKey);
                state.game.firstPlayer.login.should.equal(MESSAGE_GAME_SUCCESS_LOADED.firstPlayer.login);
                state.game.firstPlayer.score.should.equal(MESSAGE_GAME_SUCCESS_LOADED.firstPlayer.score);
                state.game.firstPlayer.figures.should.equal(MESSAGE_GAME_SUCCESS_LOADED.firstPlayer.figures);
                state.game.secondPlayer.login.should.equal(MESSAGE_GAME_SUCCESS_LOADED.secondPlayer.login);
                state.game.secondPlayer.score.should.equal(MESSAGE_GAME_SUCCESS_LOADED.secondPlayer.score);
                state.game.secondPlayer.figures.should.equal(MESSAGE_GAME_SUCCESS_LOADED.secondPlayer.figures);
                done()
            }
        });

        store.dispatch(gameSuccessLoaded(MESSAGE_GAME_SUCCESS_LOADED));
    });

    it('should write single game success loaded', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            SINGLE_GAME_SUCCESS_LOADED: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.loading.should.equal(MESSAGE_SINGLE_GAME_SUCCESS_LOADED.loading);
                state.game.disconnected.should.equal(MESSAGE_SINGLE_GAME_SUCCESS_LOADED.disconnected);
                state.game.gameKey.should.equal(MESSAGE_SINGLE_GAME_SUCCESS_LOADED.gameKey);
                state.game.firstPlayer.login.should.equal(MESSAGE_SINGLE_GAME_SUCCESS_LOADED.firstPlayer.login);
                state.game.firstPlayer.score.should.equal(MESSAGE_SINGLE_GAME_SUCCESS_LOADED.firstPlayer.score);
                state.game.firstPlayer.figures.should.equal(MESSAGE_SINGLE_GAME_SUCCESS_LOADED.firstPlayer.figures);
                done()
            }
        });

        store.dispatch(singleGameSuccessLoaded(MESSAGE_SINGLE_GAME_SUCCESS_LOADED));
    });

    it('should write game update success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            GAME_UPDATE_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.firstPlayer.figures.should.equal(MESSAGE_GAME_UPDATE_SUCCESS.firstPlayer.figures);
                state.game.secondPlayer.figures.should.equal(MESSAGE_GAME_UPDATE_SUCCESS.secondPlayer.figures);
                done()
            }
        });

        store.dispatch(gameUpdateSuccess(MESSAGE_GAME_UPDATE_SUCCESS));
    });

    it('should write single game update success', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            SINGLE_GAME_UPDATE_SUCCESS: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.firstPlayer.figures.should.equal(MESSAGE_SINGLE_GAME_UPDATE_SUCCESS.firstPlayer.figures);
                done()
            }
        });

        store.dispatch(singleGameUpdateSuccess(MESSAGE_SINGLE_GAME_UPDATE_SUCCESS));
    });

    it('should write game on unmount clean', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            ON_UNMOUNT_CLEAN: ({dispatch, getState}) =>  {
                const state = getState();
                done()
            }
        });

        store.dispatch(onUnmountClean(MESSAGE_ON_UNMOUNT_CLEAN));
    });

    it('should write game loading action', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            GAME_LOADING_ACTION: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.loading.should.equal(MESSAGE_GAME_LOADING_ACTION.loading);
                done()
            }
        });

        store.dispatch(gameIsLoading(MESSAGE_GAME_LOADING_ACTION.loading));
    });

    it('should write game disconnection action', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            GAME_DISCONNECTION_ACTION: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.disconnected.should.equal(MESSAGE_GAME_DISCONNECTION_ACTION.disconnected);
                done()
            }
        });

        store.dispatch(gameDisconnectionAction(MESSAGE_GAME_DISCONNECTION_ACTION.disconnected));
    });

    it('should write game end action', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            GAME_END: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.end.should.equal(MESSAGE_GAME_END.end);
                state.game.endGameMsg.should.equal(MESSAGE_GAME_END.msg);
                done()
            }
        });

        store.dispatch(gameEnd(MESSAGE_GAME_END));
    });

    it('should write game not found action', (done) => {
        const initialState = {};
        const store =  configureStore(rootReducer, null, initialState, {
            GAME_NOT_FOUND: ({dispatch, getState}) =>  {
                const state = getState();
                state.game.gameNotFound.should.equal(MESSAGE_GAME_NOT_FOUND.notFound);
                state.game.gameNotFoundMsg.should.equal(MESSAGE_GAME_NOT_FOUND.msg);
                done()
            }
        });

        store.dispatch(gameNotFound(MESSAGE_GAME_NOT_FOUND));
    });
});
