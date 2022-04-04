import axios from "axios";
import URLst from "../../../utils/constants";
import * as actionTypes from "./allTeachersActionTypes";
import { loadingTrue, loadingFalse, errorMessage } from "../../../store";

export const teacherPending = () => {
  return {
    type: actionTypes.TEACHER_PENDING,
    isPending: true,
  };
};
export const teacherSuccess = (data) => {
  return {
    type: actionTypes.TEACHER_SUCCESS,
    isPending: false,
    data: data.rows,
    count: data.count,
  };
};

export const teacherFail = (error) => {
  return {
    type: actionTypes.TEACHER_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllTeacherSuccess = (limit, page) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(teacherPending());
    dispatch(loadingTrue());
    axios({
      method: "get",
      url: URLst + `api/v1/teachers?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(teacherSuccess(res.data.data.data));

        dispatch(loadingFalse());
      })

      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(teacherFail(errorData));
      });
  };
};

export const AllTeacherEdit = (id, users, edited) => {
  const newData = [...users];
  const index = newData.findIndex((ii) => id === ii.userId);

  const thedata = newData[index];
  thedata.userInformation.name = edited.teacherName;

  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(teacherPending());
    dispatch(loadingTrue());

    axios({
      method: "patch",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: edited.teacherName,
      },
    })
      .then((res) => {
        dispatch(
          teacherSuccess({
            count: getState().teacher.count,
            rows: newData,
          })
        );

        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }

        dispatch(teacherFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};

export const AllTeacherDelete = (id, users) => {
  var filtereddata = users.filter((item) => item.uuid !== id);

  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(teacherPending());
    dispatch(loadingTrue());

    axios({
      method: "delete",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(teacherSuccess(filtereddata));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(teacherFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};
