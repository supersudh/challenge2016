/**
 * Created by Zhengfeng Yao on 16/8/27.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';

export default combineReducers({
  app,
  routing: routerReducer,
});
