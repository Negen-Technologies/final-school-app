import * as actionTypes from "./forgetactionTypes";

const initialState = {
  message:null,
  error: null,
  loading: false,
  
};

const forgotPassStart = (state,) => {
  return  {
    ...state,
    message:null,
    error: null,
    loading: true
  }
};

const forgotPassSuccess = (state, action) => {
  return {
    ...state,
    message:action.message,
    error: null,
    loading: false
  }
};

const forgotPassFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}



const forgotreducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORGOTPASS_START:
      return forgotPassStart(state,);
    case actionTypes.FORGOTPASS_SUCCESS:
      return forgotPassSuccess(state, action);
    case actionTypes.FORGOTPASS_FAIL:
      return forgotPassFail(state, action);
    default:
      return state;
  }
};

export default forgotreducer;
