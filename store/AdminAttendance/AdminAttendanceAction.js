import axios from "axios";
import * as actionTypes from "./AdminAttendanceActionType";
import URLst from "../../utils/constants";
import { attendancePending } from "..";

export const adminAttendanceStart = () => {
  return {
    type: actionTypes.ADMIN_ATTENDANCE_START,
  };
};

export const adminAttendanceSuccess = (message) => {
  return {
    type: actionTypes.ADMIN_ATTENDANCE_SUCCESS,
    message: message,
  };
};

export const adminAttendanceFail = (error) => {
  return {
    type: actionTypes.ADMIN_ATTENDANCE_FAILED,
    error: error,
  };
};

export const attendDataSuccess = (message) => {
  return {
    type: actionTypes.ATTEND_GOT_DATA_SUCCESS,
    message: message,
  };
};

export const studentAttendanceDetail = (studentId) => {
  return (dispatch, getState) => {
    dispatch(adminAttendanceStart());
    dispatch(attendancePending());
    const { token } = getState().auth;

    axios
      .get(URLst + `api/v1/attendance/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(adminAttendanceSuccess(res.data.data.days));
      })
      .then((res) => {
        dispatch(attendDataSuccess(true));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(adminAttendanceFail(errorData));
        dispatch(attendDataSuccess(false));
      });
  };
};
