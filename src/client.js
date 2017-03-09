/**
  * Created by Zhengfeng Yao on 16/8/27.
  */
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import domReady from 'domready';
import store from './configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import DevTools from './devtools';

function windowHeight() {
  var de = document.documentElement;
  return self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
}

window.onload = window.onresize=function(){
  document.getElementById('content').style.height = `${windowHeight()}px`;
};

const MOUNT_NODE = document.getElementById('content');
const history = syncHistoryWithStore(browserHistory, store);

let render = () => domReady(() => {
  const routes = require('./routes').default;

  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={history}>
          {routes}
        </Router>
        {
          __DEV__ && DevTools
        }
      </div>
    </Provider>,
    MOUNT_NODE
  );
});

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render();
      })
    })
  }
}

// ========================================================
// Go!
// ========================================================
render();
