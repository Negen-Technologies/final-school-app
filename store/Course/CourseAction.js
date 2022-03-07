import {
  GET_COURSE_FAILED,
  GET_COURSE_PENDING,
  GET_COURSE_SUCCESS,
} from "./CourseActionType";
import { loadingFalse, errorMessage } from "../index";
import axios from "axios";
import URLst from "../../utils/constants";

export const getAllCourses = (t) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_COURSE_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst+`api/v1/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_COURSE_SUCCESS,
          payload: response.data.data.data.rows,
        });
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;

        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(errorMessage(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: GET_COURSE_FAILED, payload: errorData });
      });
  };
};
