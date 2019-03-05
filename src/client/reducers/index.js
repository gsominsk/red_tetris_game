import {combineReducers}    from 'redux'

import menu                 from './menu'
import login                from './login'
import game                 from './game'
import newpass              from './newpass'
import rates                from './rates'
import register             from './register'

export default combineReducers({
    menu,
    login,
    game,
    newpass,
    rates,
    register
})