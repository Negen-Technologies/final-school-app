import axios from "axios";
import * as actionTypes from "./createAttendanceActionType";
import URLst from "../../utils/constants";
import { attendancePending } from "..";

export const createAttendanceStart = () => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_START,
  };
};

export const createAttendanceSuccess = (message) => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_SUCCESS,
    message: message,
  };
};

export const createAttendanceFail = (error) => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_FAILED,
    error: error,
  };
};

export const createAttendance = (studentsId, date, classId) => {
  return (dispatch, getState) => {
    dispatch(createAttendanceStart());
    dispatch(attendancePending());
    const { token } = getState().auth;

    axios
      .post(
        URLst + "api/v1/attendance",
        {
          studentsId: studentsId,
          date: date,
          classId: classId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const message = res.data.message;

        dispatch(createAttendanceSuccess(res.data.data.days));
        // dispatch({
        //   type: actionTypes.CREATE_ATTENDANCE_SUCCESS,
        //   payload: {
        //     payload: res.data.data.data,
        //     count: res.data.data.data.count,
        //     classId: classId,
        //   },
        // });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(createAttendanceFail(errorData));
      });
  };
};
