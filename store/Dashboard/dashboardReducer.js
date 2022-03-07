import * as actionTypes from "./dashboardActionTypes";

const initialState = {
  message: {},
  error: null,
  loading: false,
};

const dashboardStart = (state) => {
  return {
    ...state,
    message: {},
    error: null,
    loading: true,
  };
};

const dashboardSuccess = (state, action) => {
  return {
    ...state,
    message: action.message,
    error: null,
    loading: false,
  };
};

const dashboardFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DASHBOARD_START:
      return dashboardStart(state);
    case actionTypes.DASHBOARD_SUCCESS:
      return dashboardSuccess(state, action);
    case actionTypes.DASHBOARD_FAIL:
      return dashboardFail(state, action);
    default:
      return state;
  }
};
