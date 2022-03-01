import * as types from "./loadingTypes";
const initialState = {
  visible: false,
  dataReady: false,
};
export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_TRUE:
      return {
        visible: true,
        dataReady: false,
      };
    case types.SET_LOADING_DATA_READY:
      return {
        visible: true,
        dataReady: true,
      };
    case types.SET_LOADING_FALSE:
      return {
        visible: false,
        dataReady: false,
      };
    default:
      return state;
  }
};
