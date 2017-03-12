import {
  FETCH_STATES,
  FETCH_CITIES,
  CURRENT_STATE,
  ADD_PERMISSION,
  BLOCK_PERMISSION,
  CHECK_PERMISSIONS,
  RESET_KEY,
  FETCH_COUNTRIES,
  DISTRIBUTOR_CREATED
} from '../actions';

const INITIAL_STATE = { user_pool: [] };

export default function (state = INITIAL_STATE, action) {
  console.log("dist reducer",action);
  switch (action.type) {
    case CURRENT_STATE:
      return { ...state, user_pool: action.payload.data };
    case FETCH_COUNTRIES:
      return { ...state, countries: action.payload };
    case DISTRIBUTOR_CREATED:
      return { ...state, user_pool: action.payload.data };  
    default:
      return state;
  }
}