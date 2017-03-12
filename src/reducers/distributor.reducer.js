import {
  FETCH_STATES,
  FETCH_CITIES,
  CURRENT_STATE,
  ADD_PERMISSION,
  ADDING_PERMISSION,
  BLOCK_PERMISSION,
  CHECK_PERMISSIONS,
  RESET_KEY,
  FETCH_COUNTRIES,
  DISTRIBUTOR_CREATED,
  LOADING_STATES,
  LOADING_CITIES
} from '../actions';

const INITIAL_STATE = { user_pool: [] };

export default function (state = INITIAL_STATE, action) {
  console.log("dist reducer", action);
  switch (action.type) {
    case CURRENT_STATE:
      return { ...state, user_pool: action.payload.data };
    case FETCH_COUNTRIES:
      return { ...state, countries: action.payload };
    case DISTRIBUTOR_CREATED:
      return { ...state, user_pool: action.payload.data };
    case LOADING_STATES:
      return { ...state, loading_states: true };
    case LOADING_CITIES:
      return { ...state, loading_cities: true };
    case FETCH_STATES:
      return { ...state, states: action.payload.data, loading_states: false };
    case FETCH_CITIES:
      return { ...state, cities: action.payload.data, loading_cities: false };
    case ADDING_PERMISSION:
      return { ...state, adding_permission: true };
    case ADD_PERMISSION:
      return { ...state, user_pool: action.payload.data, adding_permission: false };  
    default:
      return state;
  }
}