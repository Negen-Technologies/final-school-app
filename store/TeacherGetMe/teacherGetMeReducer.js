import * as actionTypes from "./teacherGetMeActionTypes";

const initialState = {
  teacher: {},
  error: null,
  loading: false,
};

const teacherGetMeStart = (state) => {
  return {
    ...state,
    teacher: {},
    error: null,
    loading: true,
  };
};

const teacherGetMeSuccess = (state, action) => {
  return {
    ...state,
    teacher: action.message,
    // count:action.message.count,
    error: null,
    loading: false,
  };
};

const teacherGetMeFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const teacherGetMeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEACHER_GET_ME_START:
      return teacherGetMeStart(state);
    case actionTypes.TEACHER_GET_ME_SUCCESS:
      return teacherGetMeSuccess(state, action);
    case actionTypes.TEACHER_GET_ME_FAILED:
      return teacherGetMeFail(state, action);
    default:
      return state;
  }
};
