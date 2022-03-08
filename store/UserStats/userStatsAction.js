import axios from "axios";
import * as actionTypes from "./userStatsActionTypes";
import URLst from "../../utils/constants";
import { attendancePending } from "..";

export const userStatsStart = () => {
  return {
    type: actionTypes.USER_STATS_START,
  };
};

export const userStatsSuccess = (message) => {
  return {
    type: actionTypes.USER_STATS_SUCCESS,
    message: message,
  };
};

export const userStatsFail = (error) => {
  return {
    type: actionTypes.USER_STATS_FAILED,
    error: error,
  };
};

export const userStatsAction = () => {
  return (dispatch, getState) => {
    dispatch(userStatsStart());
    const { token } = getState().auth;
    //
    axios
      .get(
        URLst + `api/v1/users/stats`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(userStatsSuccess(res.data.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(userStatsFail(errorData));
      });
  };
};
