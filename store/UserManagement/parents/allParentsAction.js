import axios from "axios";
import URLst from "../../../utils/constants";
import * as actionTypes from "./allParentsActionTypes";
import { loadingTrue, loadingFalse, errorMessage } from "../../../store";
import { deleteUserSuccess } from "../users/allUsersAction";

export const parentPending = () => {
  return {
    type: actionTypes.PARENT_PENDING,
    isPending: true,
  };
};
export const parentSuccess = (rows, count) => {
  return {
    type: actionTypes.PARENT_SUCCESS,
    isPending: false,
    data: rows,
    count: count,
  };
};

export const parentFail = (error) => {
  return {
    type: actionTypes.PARENT_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllParentSuccess = (limit, page) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(parentPending());
    dispatch(loadingTrue());
    axios({
      method: "get",
      url: URLst + `api/v1/users?role=parent&limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(
          parentSuccess(res.data.data.data.rows, res.data.data.data.count)
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
        dispatch(parentFail(errorData));
        dispatch(errorMessage(errorData));
      });
  };
};
export const AllParentEdit = (id, users, edited) => {
  const newData = [...users];
  const index = newData.findIndex((ii) => id === ii.uuid);

  const thedata = newData[index];
  newData.splice(index, 1, { ...thedata, ...edited });

  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(parentPending());
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
        dispatch(parentSuccess(newData, newData.length));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(parentFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};

export const AllParentDelete = (id, users) => {
  var filtereddata = users.filter((item) => item.uuid !== id);

  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(parentPending());
    dispatch(loadingTrue());

    axios({
      method: "delete",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(parentSuccess(filtereddata, filtereddata.length));
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
        dispatch(parentFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};
