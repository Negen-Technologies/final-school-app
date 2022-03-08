import * as actionTypes from "./createAttendanceActionType";

const initialState = {
  filledAttendance: [],
  count: 0,
  error: null,
  loading: false,
};

const createAttendanceStart = (state) => {
  return {
    ...state,
    filledAttendance: [],
    count: 0,
    error: null,
    loading: true,
  };
};

const createAttendanceSuccess = (state, action) => {
  return {
    ...state,
    filledAttendance: action,
    count: action.message.count,
    error: null,
    loading: false,
  };
};

const createAttendanceFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const createAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ATTENDANCE_START:
      return createAttendanceStart(state);
    case actionTypes.CREATE_ATTENDANCE_SUCCESS:
      return createAttendanceSuccess(state, action);
    case actionTypes.CREATE_ATTENDANCE_FAILED:
      return createAttendanceFail(state, action);
    default:
      return state;
  }
};
