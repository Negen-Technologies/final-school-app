import axios from "axios";
import * as actionTypes from "./classRankActionTypes";
import URLst from "../../public/constants";
import { attendancePending } from "..";

export const classRankStart = () => {
  return {
    type: actionTypes.CLASS_RANK_START,
  };
};

export const classRankSuccess = (message) => {
  return {
    type: actionTypes.CLASS_RANK_SUCCESS,
    message: message,
  };
};

export const classRankFail = (error) => {
  return {
    type: actionTypes.CLASS_RANK_FAILED,
    error: error,
  };
};

export const classRankAction = (classId) => {
  return (dispatch, getState) => {
    dispatch(classRankStart());
    const { token } = getState().auth;
    // console.log('TOKEN', token);
    axios
      .get(
        URLst + `api/v1/assessments/results/getRank/${classId}/2014`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(classRankSuccess(res.data.data.students));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log(errorData);
        } else {
          errorData = err.message;
          console.log(errorData);
        }
        dispatch(classRankFail(errorData));
      });
  };
};
