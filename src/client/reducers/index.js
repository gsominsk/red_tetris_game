import {combineReducers}    from 'redux'

import game                 from './game'
import rates                from './rates'
import user                 from './user'

export default combineReducers({
    game,
    user,
    rates
})