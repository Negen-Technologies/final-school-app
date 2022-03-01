import {
  GET_COURSE_SUCCESS,
  GET_COURSE_PENDING,
  GET_COURSE_FAILED,
} from "./CourseActionType";

const initialStateClass = {
  isPending: false,
  courses: [],
  error: "",
};

export const getAllCoursesReducer = (
  state = initialStateClass,
  action = {}
) => {
  switch (action.type) {
    case GET_COURSE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_COURSE_SUCCESS:
      return Object.assign({}, state, {
        courses: action.payload,
        isPending: false,
      });
    case GET_COURSE_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
