import axios from "axios";
import * as actionTypes from "./AttendanceActionType";
import URLst from "../../utils/constants";

export const getStudentAttendanceStart = () => {
  return {
    type: actionTypes.GET_STUDENT_ATTENDANCES_START,
  };
};

export const getStudentAttendanceSuccess = (message) => {
  return {
    type: actionTypes.GET_STUDENT_ATTENDANCES_SUCCESS,
    message: message,
  };
};

export const getStudentAttendanceFail = (error) => {
  return {
    type: actionTypes.GET_STUDENT_ATTENDANCES_FAILED,
    error: error,
  };
};

export const getStudentAttendanceAction = (studentId) => {
  return (dispatch, getState) => {
    dispatch(getStudentAttendanceStart());
    const { token } = getState().auth;

    axios
      .get(URLst + `api/v1/attendance/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getStudentAttendanceSuccess(res.data.data.days));
      })
      .catch((err) => {
        dispatch(getStudentAttendanceFail(err));
      });
  };
};
