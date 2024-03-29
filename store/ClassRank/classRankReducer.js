import * as actionTypes from "./classRankActionTypes";

const initialState = {
  studentRank: [],
  count: 0,
  error: null,
  loading: false,
};

const classRankStart = (state) => {
  return {
    ...state,
    message: null,
    error: null,
    loading: true,
  };
};

const classRankSuccess = (state, action) => {
  return {
    ...state,
    studentRank: action.message,
    error: null,
    loading: false,
  };
};

const classRankFail = (state, action) => {
  return {
    studentRank: [],
    error: action.error,
    loading: false,
  };
};

export const classRankReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLASS_RANK_START:
      return classRankStart(state);
    case actionTypes.CLASS_RANK_SUCCESS:
      return classRankSuccess(state, action);
    case actionTypes.CLASS_RANK_FAILED:
      return classRankFail(state, action);
    default:
      return state;
  }
};
