import * as actionTypes from "./parentGetMeActionTypes";

const initialState = {
  parent: {},
  error: null,
  loading: false,
};

const parentGetMeStart = (state) => {
  return {
    ...state,
    parent: {},
    error: null,
    loading: true,
  };
};

const parentGetMeSuccess = (state, action) => {
  return {
    ...state,
    parent: action.message,
    // count:action.message.count,
    error: null,
    loading: false,
  };
};

const parentGetMeFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const parentGetMeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PARENT_GET_ME_START:
      return parentGetMeStart(state);
    case actionTypes.PARENT_GET_ME_SUCCESS:
      return parentGetMeSuccess(state, action);
    case actionTypes.PARENT_GET_ME_FAILED:
      return parentGetMeFail(state, action);
    default:
      return state;
  }
};
