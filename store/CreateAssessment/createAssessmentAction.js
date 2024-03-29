import axios from "axios";
import * as actionTypes from "./createAssessmentActionTypes";
import URLst from "../../utils/constants";
import { attendancePending } from "..";

export const createAssessmentStart = () => {
  return {
    type: actionTypes.CREATE_ASSESSMENT_START,
  };
};

export const createAssessmentSuccess = (message) => {
  return {
    type: actionTypes.CREATE_ASSESSMENT_SUCCESS,
    message: message,
  };
};

export const createAssessmentFail = (error) => {
  return {
    type: actionTypes.CREATE_ASSESSMENT_FAILED,
    error: error,
  };
};

export const createAssessmentAction = (
  name,
  value,
  courseTeacherClassId,
  semester
) => {
  return (dispatch, getState) => {
    dispatch(createAssessmentStart());
    const { token } = getState().auth;

    axios
      .post(
        URLst + "api/v1/assessments",
        {
          name: name,
          value: value,
          courseTeacherClassId: courseTeacherClassId,
          semester: semester,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const message = res.data.message;

        dispatch(createAssessmentSuccess(res.data.data));
        // dispatch({
        //   type: actionTypes.CREATE_ASSESSMENT_SUCCESS,
        //   payload: {
        //     payload: res.data.data.data,
        //     count: res.data.data.data.count,
        //     classId: classId,
        //   },
        // });
      })
      .catch((err) => {
        var errorData;
        console.log(err.response.data.message)
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(createAssessmentFail(errorData));
      });
  };
};
