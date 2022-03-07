import axios from "axios";
import URLst from "../../utils/constants";
import * as actionTypes from "./singleStudentInfoActionTypes";
import { loadingTrue, loadingFalse, errorMessage } from "..";
import store from "../../store/store";

export const infoPending = () => {
  return {
    type: actionTypes.SINGLE_STUDENT_INFO_PENDING,
    isPending: true,
  };
};

export const infoSuccess = (data) => {
  return {
    type: actionTypes.SINGLE_STUDENT_INFO_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const infoFail = (error) => {
  return {
    type: actionTypes.SINGLE_STUDENT_INFO_FAILED,
    error: error,
    isPending: false,
  };
};

export const getSingleStudentInfo = (id) => {
  var token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(infoPending());
    dispatch(loadingTrue());
    axios({
      method: "get",
      url: URLst + `api/v1/students/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(infoSuccess(res.data.data.data));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(infoFail(errorData));
        dispatch(errorMessage(errorData));
        dispatch(loadingFalse());
      });
  };
};

export const updateSingleStudentInfo = (value) => {
  var token = localStorage.getItem("token");
  const info = store.getState().singleStudentInfo.info;

  return (dispatch) => {
    dispatch(infoPending());
    dispatch(loadingTrue());
    axios({
      method: "patch",
      url: URLst + `api/v1/students/${value.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        firstName: value.fName,
        lastName: value.lName,
      },
    })
      .then((res) => {
        var resdata = res.data.data.data;
        resdata["class"] = info.class;
        resdata["parent"] = info.parent;
        resdata["previousClasses"] = info.previousClasses;
        dispatch(infoSuccess(resdata));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(infoFail(errorData));
        dispatch(errorMessage(errorData));
        dispatch(loadingFalse());
      });
  };
};

export const updateParentInfo = (value) => {
  var token = localStorage.getItem("token");
  const info = store.getState().singleStudentInfo.info;

  return (dispatch) => {
    dispatch(infoPending());
    dispatch(loadingTrue());
    axios({
      method: "patch",
      url: URLst + `api/v1/users/${value.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: value.Name,
        email: value.Email,
      },
    })
      .then((res) => {
        info["parent"] = res.data.data.data;
        dispatch(infoSuccess(info));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(infoFail(errorData));
        dispatch(errorMessage(errorData));
        dispatch(loadingFalse());
      });
  };
};
