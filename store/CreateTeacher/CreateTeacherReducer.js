import {
  CREATE_TEACHER_FAILED,
  CREATE_TEACHER_PENDING,
  CREATE_TEACHER_SUCCESS,
  UPDATE_TEACHER_FAILED,
  UPDATE_TEACHER_PENDING,
  UPDATE_TEACHER_SUCCESS,
} from "./CreateTeacherActionType";

const initialStateTeacher = {
  isPending: false,
  createdTeacher: {},
  error: "",
};

export const createTeacherReducer = (
  state = initialStateTeacher,
  action = {}
) => {
  switch (action.type) {
    case CREATE_TEACHER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_TEACHER_SUCCESS:
      return Object.assign({}, state, {
        createdTeacher: action.payload,
        isPending: false,
      });
    case CREATE_TEACHER_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    case UPDATE_TEACHER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_TEACHER_SUCCESS:
      return Object.assign({}, state, {
        createdTeacher: action.payload,
        isPending: false,
      });
    case UPDATE_TEACHER_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
