import * as actionTypes from "./changeLogsActionTypes";


const initialState = {
  changeLogs:[],
  count:0,
  error: null,
  loading: false,
};


const changeLogsStart = (state,) => {
  return  {
    ...state,
    changeLogs:[],
    error: null,
    loading: true
  }
};

const changeLogsSuccess = (state, action) => {
  console.log('reducer', action)
  return {
    ...state,
    changeLogs: action.message.rows,
    error: null,
    loading: false
  }
};

const changeLogsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}

export const changeLogsReducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGS_START:
      return changeLogsStart(state,);
    case actionTypes.CHANGE_LOGS_SUCCESS:
      return changeLogsSuccess(state, action);
    case actionTypes.CHANGE_LOGS_FAILED:
      return changeLogsFail(state, action);
    default:
      return state;
  }
};

