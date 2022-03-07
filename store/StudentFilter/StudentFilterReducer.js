import {
  REQUEST_STUDENTS_PENDING,
  REQUEST_STUDENTS_SUCCESS,
  REQUEST_STUDENTS_FAILED,
  GET_ALL_STUDENTS_PENDING,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILED,
  REQUEST_STUDENTS_BY_FILTER_FAILED,
  REQUEST_STUDENTS_BY_FILTER_PENDING,
  REQUEST_STUDENTS_BY_FILTER_SUCCESS,
  REQUEST_STUDENTS_BY_FILTER_SELECTED,
} from "./StudentFilterActionType";

const initialStateStudents = {
  isPending: false,
  count: 0,
  students: [],
  error: "",
};

const initialStateStudentsByFilter = {
  isPending: false,
  classId: "",
  count: 0,
  class: 0,
  section: "",
  students: [],
  error: "",
  selectedId: "",
};

const initialStateSAllStudents = {
  isPending: false,
  classId: "",
  count: 0,
  class: 0,
  section: "",
  students: [],
  error: "",
  selectedId: "",
};

export const getAllStudentsReducer = (
  state = initialStateSAllStudents,
  action = {}
) => {
  switch (action.type) {
    case GET_ALL_STUDENTS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_ALL_STUDENTS_SUCCESS:
      return Object.assign({}, state, {
        students: action.payload.rows,
        count: action.payload.count,
        isPending: false,
      });
    case GET_ALL_STUDENTS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};

export const requestStudents = (state = initialStateStudents, action = {}) => {
  switch (action.type) {
    case REQUEST_STUDENTS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_STUDENTS_SUCCESS:
      return Object.assign({}, state, {
        students: action.payload.rows,
        count: action.payload.count,
        isPending: false,
      });
    case REQUEST_STUDENTS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};

export const requestStudentsByFilter = (
  state = initialStateStudentsByFilter,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_STUDENTS_BY_FILTER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_STUDENTS_BY_FILTER_SUCCESS:
      return Object.assign({}, state, {
        students: action.payload,
        classId: action.payload.classId,
        isPending: false,
      });
    case REQUEST_STUDENTS_BY_FILTER_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    case REQUEST_STUDENTS_BY_FILTER_SELECTED:
      return Object.assign({}, state, {
        selectedId: action.payload,
      });
    default:
      return state;
  }
};
