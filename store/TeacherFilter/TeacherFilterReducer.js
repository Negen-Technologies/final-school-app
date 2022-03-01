import {
  REQUEST_TEACHERS_FAILED,
  REQUEST_TEACHERS_PENDING,
  REQUEST_TEACHERS_SUCCESS,
} from "./TeacherFilterActionType";

const initialStateStudents = {
  isPending: false,
  teachers: [],
  error: "",
};

const singleTeacher = {
  isPending: false,
  teacher: {},
  error: "",
};

export const requestTeachers = (state = initialStateStudents, action = {}) => {
  switch (action.type) {
    case REQUEST_TEACHERS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_TEACHERS_SUCCESS:
      return Object.assign({}, state, {
        teachers: action.payload,
        isPending: false,
      });
    case REQUEST_TEACHERS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
 
// Single Teacher