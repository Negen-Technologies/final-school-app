import * as actionTypes from "./createAssessmentActionTypes";

const initialState = {
  assessment:{},
  count:0,
  error: null,
  loading: false,
};


const createAssessmentStart = (state,) => {
  return  {
    ...state,
    assessment: {},
    count:0,
    error: null,
    loading: true
  }
};

const createAssessmentSuccess = (state, action) => {

  console.log('rrrrrrr', action.message)
  return {
    ...state,
    assessment: action.message.rows,
    // count:action.message.count,
    error: null,
    loading: false
  }
};

const createAssessmentFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}



export const createAssessmentReducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ASSESSMENT_START:
      return createAssessmentStart(state,);
    case actionTypes.CREATE_ASSESSMENT_SUCCESS:
      return createAssessmentSuccess(state, action);
    case actionTypes.CREATE_ASSESSMENT_FAILED:
      return createAssessmentFail(state, action);
    default:
      return state;
  }
};

