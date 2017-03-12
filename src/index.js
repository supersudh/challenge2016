import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk'
import { Router, browserHistory } from 'react-router';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import axios from 'axios';

import reducers from './reducers';
import routes from './routes';
import * as actions from './actions';
const API_URL = 'http://localhost:8080';

const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);
const store = createStoreWithMiddleware(reducers);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={browserHistory} routes={routes} />
      </MuiThemeProvider>
    </Provider>
    , document.querySelector('.container'));
}

let key = window.localStorage.getItem("key");
let countries = window.localStorage.getItem("countries");
if (!key) {
  axios.get(`${API_URL}/initialize`).then(({data}) => {
    window.localStorage.setItem("key", data.key);
    store.dispatch(actions.fetchCurrentState());
    if(countries)
      render();
  },
    err => {
      console.log(err);
    });
}
else if(!countries) {
  axios.get(`${API_URL}/countries`).then(res => {
    window.localStorage.setItem("countries",JSON.stringify(res.data));
    store.dispatch(actions.fetchCurrentState());
    store.dispatch({type: actions.FETCH_COUNTRIES, payload : JSON.parse(res)});
    render();
  });
}
else {
  store.dispatch(actions.fetchCurrentState());
  store.dispatch({type: actions.FETCH_COUNTRIES, payload : JSON.parse(countries)});
  render();
}
