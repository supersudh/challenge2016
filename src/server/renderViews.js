/**
 * Created by Zhengfeng Yao on 16/8/27.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from '../utils';
import reducers from '../reducers';
import routes from '../routes';
import DevTools from '../devtools';

const store = createStore(reducers);

function render(config) {
  return require(`./views/default.est`)(config);
}

export default function init(server) {
  server.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (props) {
        const markup = renderToString(
          <Provider store={store}>
            <div>
              <RouterContext { ...props } />
              {
                __DEV__ && DevTools
              }
            </div>
          </Provider>
        );
        res.send(render(Object.assign({markup}, server.config)));
      } else {
        res.sendStatus(404);
      }
    });
  });
}
