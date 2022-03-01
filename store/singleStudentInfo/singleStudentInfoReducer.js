import * as actionTypes from "./singleStudentInfoActionTypes";

const initialState = {
  error: null,
  loading: false,
  info:null
};

const infoStart = (state, action) => {
  return  {
    ...state,
    error: null,
    loading: true
    
  }
};

const infoSuccess = (state, action) => {
  console.log('reducer data', action)
  return {
    ...state,
    info: action.data,
    error: null,
    loading: false
  }
};

const infoFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}




const singleStudentInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SINGLE_STUDENT_INFO_PENDING:
      return infoStart(state, action);
    case actionTypes.SINGLE_STUDENT_INFO_SUCCESS:
      return infoSuccess(state, action);
    case actionTypes.SINGLE_STUDENT_INFO_FAILED:
      return infoFail(state, action);

    default:
      return state;
  }
};

export default singleStudentInfoReducer;
