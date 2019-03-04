import {combineReducers}    from 'redux'

import menu                 from './menu'
import login                from './login'

export default combineReducers({
    menu,
    login
})