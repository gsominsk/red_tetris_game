import React                            from 'react'
import ReactDom                         from 'react-dom'
import createLogger                     from 'redux-logger'
import thunk                            from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider }                     from 'react-redux'

import reducer              from './reducers'
import App                  from './containers/app'
import { BrowserRouter }    from "react-router-dom";


const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
);

function getConfirmation(message, callback) {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
}

ReactDom.render((
      <Provider store={store}>
          <BrowserRouter getUserConfirmation={getConfirmation}>
              <App/>
          </BrowserRouter>
      </Provider>
    ),
    document.getElementById('tetris')
);
