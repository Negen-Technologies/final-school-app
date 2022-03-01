import axios from "axios";
import * as actionTypes from "./authactionTypes";
import URLst from "../../public/constants";
import { loadingTrue } from "../Loading/loadingAction";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, data) => {
  localStorage.setItem("uuid", data.uuid);
  localStorage.setItem("name", data.name);
  localStorage.setItem("email", data.email);
  localStorage.setItem("phoneNumber", data.phoneNumber);
  localStorage.setItem("role", data.role);


  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    data: data,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogin = (value) => {
  return (dispatch) => {
    dispatch(authStart());

    axios
      .post(URLst + "api/v1/users/login", {
        phoneNumber: value.phoneNumber,
        password: value.password,
      })
      .then((res) => {
        const token = res.data.token;
        const data = res.data.data.user;
        localStorage.setItem("token", res.data.token);
        dispatch(loadingTrue);
        dispatch(authSuccess(token, data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(authFail(errorData));
      });
  };
};
