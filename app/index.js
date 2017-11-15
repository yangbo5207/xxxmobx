// import './decorator';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from './stores';

import Detail from 'modules/Detail';
import Index from 'modules/Index';

class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="/detail/:type" component={Detail} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

render(<App />, document.querySelector('#root'))
