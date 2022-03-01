import * as types from "./loadingTypes";

export const loadingTrue = () => {
  return (dispatch) => {
    dispatch(setLoadingTrue());
  };
};

export const loadingFalse = () => {
  return (dispatch) => {
    dispatch(setLoadingDataDone());
    setTimeout(() => {
      dispatch(setLoadingFalse());
    }, 1000);
  };
};

export const setLoadingTrue = () => {
  return {
    type: types.SET_LOADING_TRUE,
  };
};

export const setLoadingFalse = () => {
  return {
    type: types.SET_LOADING_FALSE,
  };
};

export const setLoadingDataDone = () => {
  return {
    type: types.SET_LOADING_DATA_READY,
  };
};
