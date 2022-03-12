import axios from "axios";
import * as actionTypes from "./StudentAssesmentActionType";
import URLst from "../../utils/constants";
import { loadingTrue } from "../Loading/loadingAction";

export const studentAssesmentStart = () => {
  return {
    type: actionTypes.STUDENT_ASSESMENT_PENDING,
  };
};

export const studentAssesmentSuccess = (data) => {
  return {
    type: actionTypes.STUDENT_ASSESMENT_SUCCESS,
    studentdata: data,
  };
};

export const studentAssesmentFail = (error) => {
  return {
    type: actionTypes.STUDENT_ASSESMENT_FAILED,
    error: error,
  };
};

export const getStudentAssesment = (stuId) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(studentAssesmentStart());

    axios
      .get(URLst + `api/v1/assessments/result/${stuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        dispatch(loadingTrue);
        dispatch(studentAssesmentSuccess(data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(studentAssesmentFail(errorData));
      });
  };
};
