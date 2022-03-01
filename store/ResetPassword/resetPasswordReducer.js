import * as actionTypes from "./resetPasswordActionTypes";

const initialState = {
  isPending: false,
  error: null,
  message:null
};



const resetPassStart = (state,) => {
  return  {
    ...state,
    message:null,
    error: null,
    isPending: true
  }
};

const resetPassSuccess = (state) => {
  return {
    ...state,
    message:"You have successfully reset your password !",
    error: null,
    isPending: false
  }
};

const resetPassFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    isPending: false
  }}



export const resetPass = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_PASSWORD_PENDING:
      return resetPassStart(state, );
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return resetPassSuccess(state);
    case actionTypes.RESET_PASSWORD_FAILED:
      return resetPassFail(state, action);
    default:
      return state;
  }
};



