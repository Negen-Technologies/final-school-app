import * as actionTypes from "./singleStudentAttendanceActionTypes";

const initialState = {
  error: null,
  loading: false,
  attendance: [],
  count:0,
};

const attendanceStart = (state, action) => {
  return  {
    ...state,
    error: null,
    loading: true
    
  }
};

const attendanceSuccess = (state, action) => {
  console.log('reducer', action.payload)
  return {
    ...state,
    attendance: action.payload.payload,
    count: action.payload.count,

    error: null,
    loading: false,
  };
};

const attendanceFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}




const singleStudentAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SINGLE_STUDENT_ATTENDANCE_PENDING:
      return attendanceStart(state, action);
    case actionTypes.SINGLE_STUDENT_ATTENDANCE_SUCCESS:
      return attendanceSuccess(state, action);
    case actionTypes.SINGLE_STUDENT_ATTENDANCE_FAILED:
      return attendanceFail(state, action);

    default:
      return state;
  }
};

export default singleStudentAttendanceReducer;
