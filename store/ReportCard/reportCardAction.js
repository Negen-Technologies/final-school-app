import axios from "axios";
import * as actionTypes from "./reportCardActionTypes";
import URLst from "../../public/constants";

export const createReportCardStart = () => {
  return {
    type: actionTypes.CREATE_REPORT_CARD_START,
  };
};

export const getReportCardStart = () => {
  return {
    type: actionTypes.GET_REPORT_CARD_START,
  };
};

export const createReportCardSuccess = (message) => {
  return {
    type: actionTypes.CREATE_REPORT_CARD_SUCCESS,
    message: message,
  };
};

export const getReportCardSuccess = (message) => {
  return {
    type: actionTypes.GET_REPORT_CARD_SUCCESS,
    message: message,
  };
};

export const createReportCardFail = (error) => {
  return {
    type: actionTypes.CREATE_REPORT_CARD_FAILED,
    error: error,
  };
};

export const getReportCardFail = (error) => {
  return {
    type: actionTypes.GET_REPORT_CARD_FAILED,
    error: error,
  };
};

export const createReportCard = (classId, data) => {
  return (dispatch, getState) => {
    dispatch(createReportCardStart());
    const { token } = getState().auth;
    //
    axios
      .post(
        URLst + `api/v1/assessments/report-card/class/${classId}`,
        {
          students: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(createReportCardSuccess(res.data.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(createReportCardFail(errorData));
      });
  };
};

export const getReportCardAction = (studentId) => {
  return (dispatch, getState) => {
    dispatch(getReportCardStart());
    const { token } = getState().auth;
    //
    axios
      .get(URLst + `api/v1/assessments/report-card/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getReportCardSuccess(res.data.data.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(getReportCardFail(errorData));
      });
  };
};
