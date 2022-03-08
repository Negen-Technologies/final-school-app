import * as actionTypes from "./userStatsActionTypes";

const initialState = {
  stats: [],
  count: 0,
  error: null,
  loading: false,
};

const userStatsStart = (state) => {
  return {
    ...state,
    message: null,
    error: null,
    loading: true,
  };
};

const userStatsSuccess = (state, action) => {
  return {
    ...state,
    stats: action.message,
    error: null,
    loading: false,
  };
};

const userStatsFail = (state, action) => {
  return {
    stats: [],
    error: action.error,
    loading: false,
  };
};

export const userStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_STATS_START:
      return userStatsStart(state);
    case actionTypes.USER_STATS_SUCCESS:
      return userStatsSuccess(state, action);
    case actionTypes.USER_STATS_FAILED:
      return userStatsFail(state, action);
    default:
      return state;
  }
};
