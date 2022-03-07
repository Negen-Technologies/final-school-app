import * as actionTypes from "./AdminAttendanceActionType";

const initialState = {
  studentAttendance: [],
  count: 0,
  error: null,
  loading: false,
};

const initialAttendState = {
  attendData: false,
  count: 0,
  error: null,
  loading: false,
};

const adminAttendanceStart = (state) => {
  return {
    ...state,
    message: null,
    error: null,
    loading: true,
  };
};

const adminAttendanceSuccess = (state, action) => {
  return {
    ...state,
    studentAttendance: action.message.rows,
    count: action.message.count,
    error: null,
    loading: false,
  };
};

const adminAttendanceFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const adminAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_ATTENDANCE_START:
      return adminAttendanceStart(state);
    case actionTypes.ADMIN_ATTENDANCE_SUCCESS:
      return adminAttendanceSuccess(state, action);
    case actionTypes.ADMIN_ATTENDANCE_FAILED:
      return adminAttendanceFail(state, action);
    default:
      return state;
  }
};

const attendDataStart = (state) => {
  return {
    ...state,
    message: null,
    error: null,
    loading: true,
  };
};

const attendDataSuccess = (state, action) => {
  return {
    ...state,
    attendData: action.payload,
    error: null,
    loading: false,
  };
};

const attendDataFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const attendDataReducer = (state = initialAttendState, action) => {
  switch (action.type) {
    case actionTypes.ATTEND_GOT_DATA_START:
      return attendDataStart(state);
    case actionTypes.ATTEND_GOT_DATA_SUCCESS:
      return attendDataSuccess(state, action);
    case actionTypes.ATTEND_GOT_DATA_FAILED:
      return attendDataFail(state, action);
    default:
      return state;
  }
};
