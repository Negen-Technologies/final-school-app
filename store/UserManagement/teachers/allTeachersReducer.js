import * as actionTypes from "./allTeachersActionTypes";

const initialState = {
  error: null,
  loading: false,
  teachers: [],
  count: 0,
};

const teacherStart = (state, action) => {
  return  {
    ...state,
    error: null,
    loading: true
  }
};

const teacherSuccess = (state, action) => {
  console.log(action.data)
  return {
    ...state,
    teachers: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const teacherFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const teacherreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEACHER_PENDING:
      return teacherStart(state, action);
    case actionTypes.TEACHER_SUCCESS:
      return teacherSuccess(state, action);
    case actionTypes.TEACHER_FAILED:
      return teacherFail(state, action);

    default:
      return state;
  }
};

export default teacherreducer;
