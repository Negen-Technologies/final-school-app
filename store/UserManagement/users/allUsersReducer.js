import * as actionTypes from "./allUsersActionTypes";

const initialState = {
  error: null,
  loading: false,
  allusers: [],
  count: 0,
};

const alluserStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const alluserSuccess = (state, action) => {
  // users=[...state.allusers,action.data]
  // console.log(users)
  // console.log('users in reducer')

  return {
    ...state,
    // allusers: state.allusers.concat(action.data),
    allusers:action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const alluserFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const updateUserSuccess = (state, action) => {
  var index=state.allusers.findIndex((user) => user.uuid === action.data.uuid);
  state.allusers.splice(index, 1, action.data);
  return {
    ...state,
    error: null,
    loading: false,
  };
};

const deleteUserSuccess = (state, action) => {

  const newUsers = state.allusers.filter((user) => {
    return user.uuid !== action.data.id;
  });
  return {
    ...state,
    allusers: newUsers,
    error: null,
    loading: false,
  };
};

const allusersreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_USER_PENDING:
      return alluserStart(state, action);
    case actionTypes.ALL_USER_SUCCESS:
      return alluserSuccess(state, action);
    case actionTypes.ALL_USER_FAILED:
      return alluserFail(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    default:
      return state;
  }
};

export default allusersreducer;
