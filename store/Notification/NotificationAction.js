import axios from "axios";
import * as actionTypes from "./NotificationActionType";
import URLst from "../../utils/constants";
import { errorMessage } from "../index";

export const notificationStart = () => {
  return {
    type: actionTypes.NOTIFICATION_START,
  };
};

export const notificationSuccess = (message) => {
  return {
    type: actionTypes.NOTIFICATION_SUCCESS,
    message: message,
  };
};

export const notificationFail = (error) => {
  return {
    type: actionTypes.NOTIFICATION_FAILED,
    error: error,
  };
};

export const myNotificationStart = () => {
  return {
    type: actionTypes.MY_NOTIFICATION_START,
  };
};

export const myNotificationSuccess = (message) => {
  return {
    type: actionTypes.MY_NOTIFICATION_SUCCESS,
    message: message,
  };
};

export const myNotificationFail = (error) => {
  return {
    type: actionTypes.MY_NOTIFICATION_FAILED,
    error: error,
  };
};

export const addNotificationStart = () => {
  return {
    type: actionTypes.ADD_NOTIFICATION_START,
  };
};

export const addNotificationSuccess = (message) => {
  return {
    type: actionTypes.ADD_NOTIFICATION_SUCCESS,
    message: message,
  };
};

export const addNotificationFail = (error) => {
  return {
    type: actionTypes.ADD_NOTIFICATION_FAILED,
    error: error,
  };
};
export const getNotificationForMe = () => {
  return (dispatch, getState) => {
    dispatch(notificationStart());
    const { token } = getState().auth;
    axios
      .get(URLst + `api/v1/notifications/forMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(notificationSuccess(res.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch(notificationFail(errorData));
      });
  };
};

export const getMyNotification = () => {
  return (dispatch, getState) => {
    dispatch(myNotificationStart());
    const { token } = getState().auth;
    axios
      .get(URLst + `api/v1/notifications/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(myNotificationSuccess(res.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch(myNotificationFail(errorData));
      });
  };
};

export const addNotification = (data) => {
  return (dispatch, getState) => {
    dispatch(addNotificationStart());
    const { token } = getState().auth;
    axios
      .post(URLst + `api/v1/notifications`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(addNotificationSuccess("Notification added successfully"));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }

        dispatch(addNotificationFail(errorData));
      });
  };
};
