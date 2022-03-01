import * as types from "./messageTypes";
import { logout } from "../index";

export const authErrorHandler = (msg, status = 0) => {
  return (dispatch) => {
    if (status == "401" || msg == "The User no longer exists") {
      dispatch(logout());
      dispatch(setErrorMessage(msg, 401));
    }
  };
};

export const successMessage = (msg) => {
  return (dispatch) => {
    dispatch(setSuccessMessage(msg));
  };
};

export const infoMessage = (msg) => {
  return (dispatch) => {
    dispatch(setInfoMessage(msg));
  };
};

export const messageNull = () => {
  return (dispatch) => {
    dispatch(setMessageNull());
  };
};

export const setErrorMessage = (msg, status = 0) => {
  return {
    type: types.SET_MESSAGE_ERROR,
    payload: msg,
    status: status,
  };
};

export const setSuccessMessage = (msg) => {
  return {
    type: types.SET_MESSAGE_SUCCESS,
    payload: msg,
  };
};

export const setInfoMessage = (msg) => {
  return {
    type: types.SET_MESSAGE_INFO,
    payload: msg,
  };
};

export const setMessageNull = () => {
  return {
    type: types.SET_MESSAGE_NULL,
  };
};

export const errorMessage = (msg, status = 0) => {
  return (dispatch) => {
    dispatch(setErrorMessage(msg, status));
    if (status == "401") {
      dispatch(logout());
    }
  };
};
