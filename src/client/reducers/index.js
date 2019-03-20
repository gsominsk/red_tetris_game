import {combineReducers}    from 'redux'

import menu                 from './menu'
import game                 from './game'
import rates                from './rates'
import sidemenu             from './sidemenu'

import user                 from './user'

export default combineReducers({
    game,
    user,
    rates,

    menu,
    sidemenu
})