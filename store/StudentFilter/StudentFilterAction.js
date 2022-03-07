import {
  REQUEST_STUDENTS_PENDING,
  REQUEST_STUDENTS_SUCCESS,
  REQUEST_STUDENTS_FAILED,
  GET_ALL_STUDENTS_PENDING,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILED,
  REQUEST_STUDENTS_BY_FILTER_FAILED,
  REQUEST_STUDENTS_BY_FILTER_SUCCESS,
  REQUEST_STUDENTS_BY_FILTER_PENDING,
  REQUEST_STUDENTS_BY_FILTER_SELECTED,
} from "./StudentFilterActionType";
import { errorMessage, authErrorHandler } from "../index";
import URLst from "../../utils/constants";
import axios from "axios";

export const getAllStudents = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_ALL_STUDENTS_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst+`api/v1/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_STUDENTS_SUCCESS,
          payload: response.data.data.data,
          // payload: response.data.data.data.rows,
          // count: response.data.data.data.count,
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;

          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: GET_ALL_STUDENTS_FAILED, payload: errorData });
      });
  };
};

export const requestStudents = (stdClassId) => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_STUDENTS_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst + `api/v1/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          classId: stdClassId,
        },
      })
      .then((response) => {
        dispatch({
          type: REQUEST_STUDENTS_SUCCESS,
          payload: response.data.data.data,
          // payload: response.data.data.data.rows,
          // count: response.data.data.data.count,
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;

          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: REQUEST_STUDENTS_FAILED, payload: errorData });
      });
  };
};

export const requestStudentsByFilter = (classId, params) => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_STUDENTS_BY_FILTER_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst + `api/v1/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          classId: classId,
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: REQUEST_STUDENTS_BY_FILTER_SUCCESS,
          payload: {
            payload: response.data.data.data.rows,
            count: response.data.data.data.count,
            classId: classId,
          },
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;

          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({
          type: REQUEST_STUDENTS_BY_FILTER_FAILED,
          payload: errorData,
        });
      });
  };
};

//get unassignedStudents

export const getUnassignedStudents = (grade) => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_STUDENTS_BY_FILTER_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst+`api/v1/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          classId: "null",
          grade: grade,
        },
      })
      .then((response) => {
        dispatch({
          type: REQUEST_STUDENTS_BY_FILTER_SUCCESS,
          payload: [...response.data.data.data.rows],
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;

          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({
          type: REQUEST_STUDENTS_BY_FILTER_FAILED,
          payload: errorData,
        });
      });
  };
};

export const setStudentsId = (studentId) => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_STUDENTS_BY_FILTER_SELECTED, payload: studentId });
  };
};
