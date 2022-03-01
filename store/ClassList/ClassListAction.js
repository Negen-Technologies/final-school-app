import {
  GET_CLASS_LIST_FAILED,
  GET_CLASS_LIST_PENDING,
  GET_CLASS_LIST_SUCCESS,
  SET_FILTER,
} from "./ClassListActionType";
import { loadingFalse, errorMessage } from "../index";
import axios from "axios";

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
        `https://dev-the-school-app.herokuapp.com/api/v1/classes?sort=grade,section`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
        dispatch({
          type: GET_CLASS_LIST_SUCCESS,
          payload: response.data.data.data.rows,
          count: response.data.data.data.count,
        });
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        console.log(err.response);
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
