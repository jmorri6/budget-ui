import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import routes from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk'

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
