import {combineReducers}    from 'redux'

import menu                 from './menu'
import login                from './login'
import game                 from './game'
import newpass              from './newpass'
import rates                from './rates'
import register             from './register'
import sidemenu             from './sidemenu'

export default combineReducers({
    menu,
    login,
    game,
    newpass,
    rates,
    register,
    sidemenu
})