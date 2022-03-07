import axios from "axios";
import URLst from "../../../utils/constants";
import * as actionTypes from "./allUsersActionTypes";
import { loadingTrue, loadingFalse, errorMessage } from "../../../store";

export const alluserPending = () => {
  return {
    type: actionTypes.ALL_USER_PENDING,
    isPending: true,
  };
};
export const alluserSuccess = (data) => {
  return {
    type: actionTypes.ALL_USER_SUCCESS,
    isPending: false,
    data: data.rows,
    count: data.count,
  };
};

export const updateUserSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteUserSuccess = (data) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const alluserFail = (error) => {
  return {
    type: actionTypes.ALL_USER_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllUserSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alluserPending());
    dispatch(loadingTrue());

    axios({
      method: "get",
      url: URLst + `api/v1/users?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(alluserSuccess(res.data.data.data));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(alluserFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};

export const AllUserEdit = (id, users, edited) => {
 
  const newData = [...users];
  const index = newData.findIndex((ii) => id === ii.uuid);

  const thedata = newData[index];
  newData.splice(index, 1, { ...thedata, ...edited });

  return (dispatch,getState) => {
    const { token } = getState().auth;

    dispatch(alluserPending());
    dispatch(loadingTrue());

    axios({
      method: "patch",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: edited.name,
        email: edited.email,
      },
    })
      .then((res) => {
        dispatch(updateUserSuccess(res.data.data.data));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(alluserFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};

export const AllUserDelete = (id, users) => {
  var filtereddata = users.filter((item) => item.uuid !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alluserPending());
    dispatch(loadingTrue());

    axios({
      method: "delete",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteUserSuccess({ id: id }));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(alluserFail(errorData));
        dispatch(loadingFalse());

        errorMessage(errorData);
      });
  };
};
