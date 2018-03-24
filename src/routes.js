import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Main from './scenes/Main';
import Income from './scenes/Income'

export default (
    <Route path="/" histroy={browserHistory} component={App}>
        <IndexRoute component={Main} />
        <Route path="/income" component={Income} />
    </Route>
);