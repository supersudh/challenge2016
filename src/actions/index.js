import axios from 'axios';
import { browserHistory } from 'react-router';

export const CURRENT_STATE = 'CURENT_STATE';

export const ADDING_PERMISSION = 'ADDING_PERMISSION'; 
export const ADD_PERMISSION = 'ADD_PERMISSION';
export const BLOCK_PERMISSION = 'BLOCK_PERMISSION';
export const CHECK_PERMISSIONS = 'CHECK_PERMISSIONS';
export const RESET_KEY = 'RESET_KEY';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_STATES = 'FETCH_STATES';
export const FETCH_CITIES = 'FETCH_CITIES';

export const DISTRIBUTOR_CREATED = 'DISTRIBUTOR_CREATED';

export const LOADING_STATES = 'LOADING_STATES';
export const LOADING_CITIES = 'LOADING_CITIES';

const API_URL = 'http://localhost:8080';

export function fetchStates(country_code) {
  return (dispatch) => {
    dispatch({ type: LOADING_STATES });
    const request = axios.get(`${API_URL}/states?country_code=${country_code}`);
    dispatch({ type: FETCH_STATES, payload: request });
  };
}

export function fetchCities({country_code, province_code}) {
  return (dispatch) => {
    dispatch({ type: LOADING_CITIES });
    const request = axios.get(`${API_URL}/cities?country_code=${country_code}&province_code=${province_code}`);
    dispatch({ type: FETCH_CITIES, payload: request });
  };
}

export function fetchCurrentState() {
  let key = window.localStorage.getItem("key");
  const request = axios.get(`${API_URL}/current_state?key=${key}`);
  return {
    type: CURRENT_STATE,
    payload: request
  };
}

export function createDistributor(obj) {
  return (dispatch) => {
    let { name, is_child, is_child_of } = obj;
    let key = window.localStorage.getItem("key");
    axios.post(`${API_URL}/create_distributor`, { name, is_child, is_child_of, key })
      .then(res => {
        browserHistory.push("/manage_distributors");
        dispatch({
          type: CURRENT_STATE,
          payload: res.data
        });
      },
      err => {
        console.log("error in creating Distributor", err);
      });
  };

}

export function addPermission(obj) {
  return (dispatch) => {
    dispatch({type: ADDING_PERMISSION});
    let { country_code, province_code, city_code, id, country_name, province_name, city_name } = obj;
    let key = window.localStorage.getItem("key");
    const request = axios.post(`${API_URL}/add_permission`, { country_code, province_code, city_code, id, country_name, province_name, city_name,key });
    dispatch({type: ADD_PERMISSION,payload: request});
  };
}

