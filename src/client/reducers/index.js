import {combineReducers}    from 'redux'

import menu                 from './menu'
import login                from './login'
import game                 from './game'
import newpass              from './newpass'
import rates                from './rates'
import register             from './register'
import sidemenu             from './sidemenu'

import user                 from './user'

export default combineReducers({
    game,
    user,
    rates,

    menu,
    newpass,
    login,
    register,
    sidemenu
})