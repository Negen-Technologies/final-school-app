import axios from "axios";
import * as actionTypes from "./changeLogsActionTypes";
import URLst from "../../public/constants";

export const changeLogsStart = () => {
  return {
    type: actionTypes.CHANGE_LOGS_START,
  };
};

export const changeLogsSuccess = (message) => {
  return {
    type: actionTypes.CHANGE_LOGS_SUCCESS,
    message: message,
  };
};

export const changeLogsFail = (error) => {
  return {
    type: actionTypes.CHANGE_LOGS_FAILED,
    error: error,
  };
};

export const changeLogsAction = () => {
  return (dispatch, getState) => {
    dispatch(changeLogsStart());
    const { token } = getState().auth;

    axios
      .get(URLst + `api/v1/assessments/results/gradeChangeLog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const message = res.data.message;

        dispatch(changeLogsSuccess(res.data.data.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(changeLogsFail(errorData));
      });
  };
};
