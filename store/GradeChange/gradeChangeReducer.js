import * as actionTypes from "./gradeChangeActionTypes";

const initialState = {
  message: {},
  error: null,
  loading: false,
};

const initialAssessmentState = {
  message: [],
  error: null,
  loading: false,
};

const gradeChangeStart = (state) => {
  return {
    ...state,
    message: null,
    error: null,
    loading: true,
  };
};

const gradeChangeSuccess = (state, action, getState) => {
  return {
    ...state,
    message: action.message,
    error: null,
    loading: false,
  };
};

const gradeChangeFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const gradeChangereducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GRADE_CHANGE_START:
      return gradeChangeStart(state);
    case actionTypes.GRADE_CHANGE_SUCCESS:
      return gradeChangeSuccess(state, action);
    case actionTypes.GRADE_CHANGE_FAIL:
      return gradeChangeFail(state, action);
    default:
      return state;
  }
};

const getAssessmentStart = (state) => {
  return {
    ...state,
    message: [],
    error: null,
    loading: true,
  };
};

const getAssessmentSuccess = (state, action) => {
  return {
    ...state,
    message: action.message,
    error: null,
    loading: false,
  };
};

const getAssessmentFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const getAssessmentReducer = (
  state = initialAssessmentState,
  action
) => {
  switch (action.type) {
    case actionTypes.GET_ASSESSMENT_START:
      return getAssessmentStart(state);
    case actionTypes.GET_ASSESSMENT_SUCCESS:
      return getAssessmentSuccess(state, action);
    case actionTypes.GET_ASSESSMENT_FAIL:
      return getAssessmentFail(state, action);
    default:
      return state;
  }
};
