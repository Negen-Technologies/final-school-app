import axios from "axios";
import URLst from "../../utils/constants";
import * as actionTypes from "./resetPasswordActionTypes";
import { authSuccess, errorMessage } from "../index";

export const resetPending = () => {
  return {
    type: actionTypes.RESET_PASSWORD_PENDING,
    isPending: true,
  };
};

export const resetSuccess = () => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    isPending: false,
  };
};

export const resetFail = (error) => {
  return {
    type: actionTypes.RESET_PASSWORD_FAILED,
    error: error,
    isPending: false,
  };
};

export const resetPasswordAction = (password, resetToken) => {
  return (dispatch) => {
    dispatch(resetPending());
    axios
      .patch(URLst + `api/v1/users/resetPassword/${resetToken}`, {
        password: password,
        passwordConfirm: password,
      })
      .then((res) => {
        const token = res.data.token;
        const data = res.data.data.user;
        localStorage.setItem("token", res.data.token);

        dispatch(authSuccess(token, data));
        dispatch(resetSuccess());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch(resetFail(errorData));
      });
  };
};
