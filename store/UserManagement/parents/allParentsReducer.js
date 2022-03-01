import * as actionTypes from "./allParentsActionTypes";

const initialState = {
  error: null,
  loading: false,
  parents: [],
  count: 0,
};

const parentStart = (state, action) => {
  return  {
    ...state,
    error: null,
    loading: true
  }
};

const parentSuccess = (state, action) => {
  console.log('in the reducer', action)
  return {
    ...state,
    parents: action.data,
    count:action.count,
    error: null,
    loading: false
  }
};

const parentFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}



const parentreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PARENT_PENDING:
      return parentStart(state, action);
    case actionTypes.PARENT_SUCCESS:
      return parentSuccess(state, action);
    case actionTypes.PARENT_FAILED:
      return parentFail(state, action);

    default:
      return state;
  }
};

export default parentreducer;
