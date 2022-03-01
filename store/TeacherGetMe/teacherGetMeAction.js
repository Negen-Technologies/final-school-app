import axios from "axios";
import * as actionTypes from "./teacherGetMeActionTypes";
import URLst from "../../public/constants";
import { attendancePending } from "..";

export const teacherGetMeStart = () => {
  return {
    type: actionTypes.TEACHER_GET_ME_START,
  };
};

export const teacherGetMeSuccess = (message) => {
  return {
    type: actionTypes.TEACHER_GET_ME_SUCCESS,
    message: message,
  };
};

export const teacherGetMeFail = (error) => {
  return {
    type: actionTypes.TEACHER_GET_ME_FAILED,
    error: error,
  };
};

export const teacherGetMeAction = () => {
  return (dispatch, getState) => {
    dispatch(teacherGetMeStart());
    const { token } = getState().auth;
    console.log(token);

    axios
      .get(
        URLst + "api/v1/teachers/getMe",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const message = res.data.message;
        console.log("actionnnn");
        console.log(res.data.data);
        dispatch(teacherGetMeSuccess(res.data.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log(errorData);
        } else {
          errorData = err.message;
          console.log(errorData);
        }
        dispatch(teacherGetMeFail(errorData));
      });
  };
};
