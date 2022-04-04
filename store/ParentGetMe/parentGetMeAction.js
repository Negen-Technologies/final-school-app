import axios from "axios";
import * as actionTypes from "./parentGetMeActionTypes";
import URLst from "../../utils/constants";
import { attendancePending } from "..";

export const parentGetMeStart = () => {
  return {
    type: actionTypes.PARENT_GET_ME_START,
  };
};

export const parentGetMeSuccess = (message) => {
  return {
    type: actionTypes.PARENT_GET_ME_SUCCESS,
    message: message,
  };
};

export const parentGetMeFail = (error) => {
  return {
    type: actionTypes.PARENT_GET_ME_FAILED,
    error: error,
  };
};

export const parentGetMeAction = () => {
  return (dispatch, getState) => {
    dispatch(parentGetMeStart());
    const { token } = getState().auth;

    axios
      .get(
        URLst + "api/v1/parents/getMe",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const message = res.data.message;

        dispatch(parentGetMeSuccess(res.data.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(parentGetMeFail(errorData));
      });
  };
};
