import {
  REQUEST_TEACHERS_FAILED,
  REQUEST_TEACHERS_SUCCESS,
  REQUEST_TEACHERS_PENDING,
} from "./TeacherFilterActionType";
import { errorMessage, authErrorHandler } from "../index";

import axios from "axios";

export const requestTeachers = (stdClassId) => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_TEACHERS_PENDING });
    const { token } = getState().auth;
    axios
      .get(`https://dev-the-school-app.herokuapp.com/api/v1/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: REQUEST_TEACHERS_SUCCESS,
          payload: response.data.data.data,
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log(err.response.status);
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: REQUEST_TEACHERS_FAILED, payload: errorData });
      });
  };
};
