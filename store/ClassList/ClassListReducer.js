import {
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_PENDING,
  GET_CLASS_LIST_FAILED,
  GET_A_CLASS_FAILED,
  GET_A_CLASS_PENDING,
  GET_A_CLASS_SUCCESS,
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

const singleClass = {
  isPending: false,
  class: null,
  error: "",
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

export const getAClassReducer = (state = singleClass, action = {}) => {
  switch (action.type) {
    case GET_A_CLASS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_A_CLASS_SUCCESS:
      return Object.assign({}, state, {
        class: action.payload,
        isPending: false,
      });
    case GET_A_CLASS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
