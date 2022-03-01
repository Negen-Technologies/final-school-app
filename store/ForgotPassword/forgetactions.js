import axios from "axios";
import * as actionTypes from "./forgetactionTypes";
import URLst from '../../public/constants'


export const forgotPassStart = () => {
  return {
    type: actionTypes.FORGOTPASS_START
  };
};

export const forgotPassSuccess = (message) => {
  return {
    type: actionTypes.FORGOTPASS_SUCCESS,
    message: message,
   
  };
};

export const forgotPassFail = error => {

  return {
    type: actionTypes.FORGOTPASS_FAIL,
    error: error
  };
};





export const forgotPassword = (value) => {
  return dispatch => {
    dispatch(forgotPassStart());
    
    axios
      .post(URLst + "api/v1/users/forgotPassword", {
        email: value.email,
      })
      .then(res => {
        const message = res.data.message;
        
        dispatch(forgotPassSuccess(message));
        
      })
      .catch(err => {
        var errorData;
        if (err.response!=null) {
       
          errorData=err.response.data.message
        
        } else {
          errorData=err.message
        }
        dispatch(forgotPassFail(errorData));
      });
  };
};

