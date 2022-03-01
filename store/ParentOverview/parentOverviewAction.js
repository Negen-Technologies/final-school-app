import axios from "axios";
import URLst from "../../public/constants";
import * as actionTypes from "./parentOverviewActionTypes";
import { authSuccess, errorMessage } from "../index";

export const parentOverviewPending = () => {
  return {
    type: actionTypes.PARENT_OVERVIEW_PENDING,
    isPending: true,
  };
};

export const parentOverviewSuccess = () => {
  return {
    type: actionTypes.PARENT_OVERVIEW_SUCCESS,
    isPending: false,
  };
};

export const parentOverviewFail = (error) => {
  return {
    type: actionTypes.PARENT_OVERVIEW_FAILED,
    error: error,
    isPending: false,
  };
};

export const parentOverviewAction = () => {
  return dispatch => {
    dispatch(parentOverviewPending());
    axios.get(URLst+`/api/v1/parents/getMe`)
      .then((res) => {
   
console.log('ACTION', res);
        dispatch({
          type: actionTypes.PARENT_OVERVIEW_SUCCESS,
          payload: {
            payload: res.data.data.children.rows,
            count: res.data.data.children.count,
        },

        });
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch(parentOverviewFail(errorData));
      });
  };
};
