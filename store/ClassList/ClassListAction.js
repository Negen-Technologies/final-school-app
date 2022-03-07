import {
  GET_CLASS_LIST_FAILED,
  GET_CLASS_LIST_PENDING,
  GET_CLASS_LIST_SUCCESS,
  GET_A_CLASS_SUCCESS,
  GET_A_CLASS_PENDING,
  GET_A_CLASS_FAILED,
  SET_FILTER,
} from "./ClassListActionType";
import { loadingFalse, errorMessage } from "../index";
import axios from "axios";
import URLst from "../../utils/constants";

export const setFilter = (filter) => {
  return (dispatch) => {
    dispatch({ type: SET_FILTER, payload: filter });
  };
};

export const getClassList = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_CLASS_LIST_PENDING });
    const { token } = getState().auth;
    axios
      .get(
        URLst+`api/v1/classes?sort=grade,section`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_CLASS_LIST_SUCCESS,
          payload: response.data.data.data.rows,
          count: response.data.data.data.count,
        });
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;

        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(errorMessage(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: GET_CLASS_LIST_FAILED, payload: errorData });
      });
  };
};

export const getAClass = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_A_CLASS_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst+`api/v1/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_A_CLASS_SUCCESS,
          payload: response.data.data.data,
        });
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;

        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(errorMessage(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: GET_A_CLASS_FAILED, payload: errorData });
      });
  };
};
