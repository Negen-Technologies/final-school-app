import axios from "axios";
import URLst from "../../utils/constants";
import * as actionTypes from "./changeProfileActionTypes";
import { authSuccess } from "../index";

export const changeProfilePending = () => {
  return {
    type: actionTypes.CHANGE_PROFILE_PENDING,
    isPending: true,
  };
};

export const changeProfileSuccess = () => {
  return {
    type: actionTypes.CHANGE_PROFILE_SUCCESS,
    isPending: false,
  };
};

export const changeProfileFail = (error) => {
  return {
    type: actionTypes.CHANGE_PROFILE_FAILED,
    error: error,
    isPending: false,
  };
};

export const changeProfileAction = (values) => {
  var token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(changeProfilePending());
    axios({
      method: "Patch",
      url: URLst + `api/v1/users/updateMe`,
      data: {
        name: values.fName + " " + values.lName,
        email: values.email,
        phoneNumber: values.Phone,
        url: values.url,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(authSuccess(token, res.data.data));

        dispatch(changeProfileSuccess());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(changeProfileFail(errorData));
      });
  };
};
