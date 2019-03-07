import {combineReducers}    from 'redux'

import menu                 from './menu'
import {
    loginHasErrored,
    login
}                           from './login'
import game                 from './game'
import newpass              from './newpass'
import {
    ratesHasErrored,
    ratesIsLoading,
    rates
}                           from './rates'
import register             from './register'
import sidemenu             from './sidemenu'

export default combineReducers({
    menu,
    login,
    loginHasErrored,
    game,
    newpass,
    rates,
    ratesHasErrored,
    ratesIsLoading,
    register,
    sidemenu
})