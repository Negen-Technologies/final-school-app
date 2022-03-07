import * as actionTypes from "./NotificationActionType";

const initialState = {
  notifications: [],
  count: 15,
  error: null,
  loading: false,
  message: null,
};

const myNotifications = {
  notifications: [],
  count: 15,
  error: null,
  loading: false,
  message: null,
};

const add = {
  error: null,
  loading: false,
  success: null,
};

const notificationStart = (state) => {
  return {
    ...state,
    message: null,
    error: null,
    loading: true,
  };
};

const notificationSuccess = (state, action) => {
  return {
    ...state,
    notifications: action.message.data,
    count: action.message.results,
    error: null,
    loading: false,
  };
};

const notificationFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const myNotificationStart = (state) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const myNotificationSuccess = (state, action) => {
  return {
    ...state,
    notifications: action.message.data,
    count: action.message.results,
    error: null,
    loading: false,
  };
};

const myNotificationFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const addNotificationStart = (state) => {
  return {
    ...state,
    error: null,
    success: null,
    loading: true,
  };
};

const addNotificationSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    success: action.message,
    loading: false,
  };
};

const addNotificationFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    success: null,
    loading: false,
  };
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATION_START:
      return notificationStart(state);
    case actionTypes.NOTIFICATION_SUCCESS:
      return notificationSuccess(state, action);
    case actionTypes.NOTIFICATION_FAILED:
      return notificationFail(state, action);
    default:
      return state;
  }
};

export const myNotificationReducer = (state = myNotifications, action) => {
  switch (action.type) {
    case actionTypes.MY_NOTIFICATION_START:
      return myNotificationStart(state);
    case actionTypes.MY_NOTIFICATION_SUCCESS:
      return myNotificationSuccess(state, action);
    case actionTypes.MY_NOTIFICATION_FAILED:
      return myNotificationFail(state, action);
    default:
      return state;
  }
};

export const addNotificationReducer = (state = add, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION_START:
      return addNotificationStart(state);
    case actionTypes.ADD_NOTIFICATION_SUCCESS:
      return addNotificationSuccess(state, action);
    case actionTypes.ADD_NOTIFICATION_FAILED:
      return addNotificationFail(state, action);
    default:
      return state;
  }
};
