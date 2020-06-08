// import jsonPlaceholder from '../../api/jsonPlaceholder';

/*
 * action types
 */
export const RESET_LIST = 'RESET_LIST';
export const FETCH_DATA = 'FETCH_DATA';

export const ADD_ITEM = 'ADD_ITEM';
export const GET_ITEMS = 'GET_ITEMS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ITEMS_LOADING = 'ITEMS_LOADING';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

/*
 * action creators
 */
export function addItem(text) {
  return { type: ADD_ITEM, payload: text };
}
export function resetList() {
  return { type: RESET_LIST };
}
export function fetchData(response) {
  return { type: FETCH_DATA, payload: response };
}

export function getErrors(error) {
  return { type: GET_ERRORS, payload: error };
}

export function clearErrors() {
  return { type: CLEAR_ERRORS, payload: '' };
}
