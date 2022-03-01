import {
  ASSIGN_CLASS_PENDING,
  ASSIGN_CLASS_SUCCESS,
  ASSIGN_CLASS_FAILED,
  CREATE_CLASS_PENDING,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAILED,
  CREATE_CLASS_CLEAR_SUCCESS,
  GET_TEACHERS_PENDING,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAILED,
  ASSIGN_TEACHERS_PENDING,
  ASSIGN_TEACHERS_SUCCESS,
  ASSIGN_TEACHERS_FAILED,
  ASSIGN_STUDENT_PENDING,
  ASSIGN_STUDENT_SUCCESS,
  ASSIGN_STUDENT_FAILED,
} from "./AssignClassActionType";

const initialStateClass = {
  isPending: false,
  assignedStudent: "",
  classes: [],
  teachers: [],
  assignedTeacher: "",
  class: "",
  error: "",
};
const createClassState = {
  isPending: false,
  class: {},
  error: "",
  success: "",
};

const assignStudentState = {
  isPending: false,
  studentId: "",
  error: "",
  success: "",
};

export const assignClassReducer = (state = initialStateClass, action = {}) => {
  switch (action.type) {
    case ASSIGN_CLASS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case ASSIGN_CLASS_SUCCESS:
      return Object.assign({}, state, {
        classes: action.payload,
        isPending: false,
      });
    case ASSIGN_CLASS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};

export const createClassReducer = (state = createClassState, action = {}) => {
  switch (action.type) {
    case CREATE_CLASS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_CLASS_SUCCESS:
      return Object.assign({}, state, {
        class: action.payload,
        isPending: false,
        error: "",
        success: "Class Successfully Created!",
      });
    case CREATE_CLASS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
        success: "",
      });
    case CREATE_CLASS_CLEAR_SUCCESS:
      return Object.assign({}, state, {
        error: "",
        success: "",
        isPending: false,
      });

    default:
      return state;
  }
};

export const getTeachersReducer = (state = initialStateClass, action = {}) => {
  switch (action.type) {
    case GET_TEACHERS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_TEACHERS_SUCCESS:
      return Object.assign({}, state, {
        teachers: action.payload,
        isPending: false,
      });
    case GET_TEACHERS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};

export const assignTeacherReducer = (
  state = initialStateClass,
  action = {}
) => {
  switch (action.type) {
    case ASSIGN_TEACHERS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case ASSIGN_TEACHERS_SUCCESS:
      return Object.assign({}, state, {
        assignedTeacher: action.payload,
        isPending: false,
      });
    case ASSIGN_TEACHERS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};

export const assignStudentReducer = (
  state = assignStudentState,
  action = {}
) => {
  switch (action.type) {
    case ASSIGN_STUDENT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case ASSIGN_STUDENT_SUCCESS:
      return Object.assign({}, state, {
        studentId: action.payload,
        isPending: false,
        success: "Student added to class successfully",
        error: "",
      });
    case ASSIGN_STUDENT_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
        success: "",
      });
    default:
      return state;
  }
};
