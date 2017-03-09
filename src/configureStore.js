/**
  * Created by Zhengfeng Yao on 16/8/29.
  */
import { createStore } from './utils';
import makeRootReducer from './reducers';

const store = createStore(makeRootReducer);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers/index').default;
    store.replaceReducer(reducers);
  })
}

export default store;
