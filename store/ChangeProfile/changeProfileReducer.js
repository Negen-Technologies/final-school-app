import * as actionTypes from "./changeProfileActionTypes";

const initialState = {
  isPending: false,
  error: null,
  message:null
};



const changeProfileStart = (state,) => {
  return  {
    ...state,
    message:null,
    error: null,
    isPending: true
  }
};

const changeProfileSuccess = (state, action) => {
  return {
    ...state,
    message: action.payload,
    error: null,
    isPending: false
  }
};

const changeProfileFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    isPending: false
  }}



export const changeProfileReducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PROFILE_PENDING:
      return changeProfileStart(state, );
    case actionTypes.CHANGE_PROFILE_SUCCESS:
      return changeProfileSuccess(state, action);
    case actionTypes.CHANGE_PROFILE_FAILED:
      return changeProfileFail(state, action);
    default:
      return state;
  }
};



