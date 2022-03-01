import {
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_PENDING,
  GET_CLASS_LIST_FAILED,
  SET_FILTER,
} from "./ClassListActionType";

const initialStateClass = {
  isPending: false,
  classes: [],
  count: 0,
  error: "",
  filter: {
    grade: 0,
    section: "",
    classId: "",
  },
};

export const getClassListReducer = (state = initialStateClass, action = {}) => {
  switch (action.type) {
    case GET_CLASS_LIST_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_CLASS_LIST_SUCCESS:
      return Object.assign({}, state, {
        classes: action.payload,
        isPending: false,
        count: action.count,
      });
    case GET_CLASS_LIST_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    case SET_FILTER:
      return Object.assign({}, state, {
        filter: action.payload,
      });
    default:
      return state;
  }
};
