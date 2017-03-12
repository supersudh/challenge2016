import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import DistributorReducer from './distributor.reducer';

 const rootReducer = combineReducers({
  //  state: (state = {}) => state
  distributor: DistributorReducer
 });
 
 export default rootReducer;