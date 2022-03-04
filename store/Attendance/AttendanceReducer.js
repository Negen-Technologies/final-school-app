import * as actionTypes from "./AttendanceActionType";

const initialState = {
  studentAttendance: [],
  count: 0,
  error: null,
  success: false,
  loading: false,
};

const getStudentAttendanceStart = (state) => {
  return {
    ...state,
    studentAttendance: [],
    error: null,
    loading: true,
  };
};

const getStudentAttendanceSuccess = (state, action) => {
  return {
    ...state,
    studentAttendance: action.message.rows,
    count: action.message.count,
    error: null,
    loading: false,
  };
};

const getStudentAttendanceFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const AttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_ATTENDANCES_START:
      return getStudentAttendanceStart(state);
    case actionTypes.GET_STUDENT_ATTENDANCES_SUCCESS:
      return getStudentAttendanceSuccess(state, action);
    case actionTypes.GET_STUDENT_ATTENDANCES_FAILED:
      return getStudentAttendanceFail(state, action);
    default:
      return state;
  }
};
