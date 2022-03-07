import axios from "axios";
import URLst from "../../../utils/constants";
import * as actionTypes from "./allAdminActionTypes";
import { loadingTrue, loadingFalse, errorMessage } from "../../../store";

export const adminPending = () => {
  return {
    type: actionTypes.ADMIN_PENDING,
    isPending: true,
  };
};
export const adminSuccess = (rows, count) => {
  return {
    type: actionTypes.ADMIN_SUCCESS,
    isPending: false,
    data: rows,
    count: count,
  };
};

export const adminFail = (error) => {
  return {
    type: actionTypes.ADMIN_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllAdminSuccess = (limit, page) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(adminPending());
    dispatch(loadingTrue());
    axios({
      method: "get",
      url: URLst + `api/v1/users?role=admin&limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(
          adminSuccess(res.data.data.data.rows, res.data.data.data.count)
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
        dispatch(adminFail(errorData));
        dispatch(errorMessage(errorData));
      });
  };
};

export const AllAdminEdit = (id, users, edited) => {
  const newData = [...users];
  const index = newData.findIndex((ii) => id === ii.uuid);

  const thedata = newData[index];
  newData.splice(index, 1, { ...thedata, ...edited });

  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(adminPending());
    dispatch(loadingTrue());

    axios({
      method: "patch",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: edited.name,
      },
    })
      .then((res) => {
        dispatch(adminSuccess(newData, newData.length));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(adminFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};

export const AllAdminDelete = (id, users) => {
  var filtereddata = users.filter((item) => item.uuid !== id);

  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(adminPending());
    dispatch(loadingTrue());

    axios({
      method: "delete",
      url: URLst + `api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(adminSuccess(filtereddata, filtereddata.length));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(adminFail(errorData));
        dispatch(loadingFalse());

        dispatch(errorMessage(errorData));
      });
  };
};
