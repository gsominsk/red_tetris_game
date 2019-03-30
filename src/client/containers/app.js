import React            from 'react'
import { connect }      from 'react-redux'
import { Route }        from "react-router-dom";

import Menu         from './menu'
import Login        from './login'
import Register     from './register'
import NewPass      from './newpass'
import Rates        from './rates'
import Game         from './game'
import SingleGame   from './singlegame'

import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <switch>
                    <Route exact path="/" component={Menu} />
                    <Route exact path="/play" component={Game} />
                    <Route exact path="/singleplay" component={SingleGame} />
                    <Route exact path="/rates" component={Rates} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/login/register" component={Register} />
                    <Route exact path="/login/newpass" component={NewPass} />
                </switch>
            </div>
        );
    }
}

export default App;