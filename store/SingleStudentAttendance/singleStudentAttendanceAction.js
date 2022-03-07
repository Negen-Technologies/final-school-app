import axios from "axios";
import URLst from "../../utils/constants";
import * as actionTypes from "./singleStudentAttendanceActionTypes";
import { loadingTrue, loadingFalse, errorMessage } from "../../store";

export const attendancePending = () => {
  return {
    type: actionTypes.SINGLE_STUDENT_ATTENDANCE_PENDING,
    isPending: true,
  };
};

export const attendanceSuccess = (data) => {
  return {
    type: actionTypes.SINGLE_STUDENT_ATTENDANCE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const attendanceFail = (error) => {
  return {
    type: actionTypes.SINGLE_STUDENT_ATTENDANCE_FAILED,
    error: error,
    isPending: false,
  };
};

export const getSingleStudentAttendance = (id) => {
  var token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(attendancePending());
    // dispatch(loadingTrue());
    axios
      .get(URLst + `api/v1/attendance/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: actionTypes.SINGLE_STUDENT_ATTENDANCE_SUCCESS,
          payload: {
            payload: res.data.data.days.rows,
            count: res.data.data.days.count,
            // classId: classId,
          },
        });
        // dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;

        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(attendanceFail(errorData));
        dispatch(errorMessage(errorData));
        // dispatch(loadingFalse());
      });
  };
};
