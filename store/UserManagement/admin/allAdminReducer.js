import * as actionTypes from "./allAdminActionTypes";

const initialState = {
  error: null,
  loading: false,
  admins:[],
  count:0
};

const adminStart = (state, action) => {
  return  {
    ...state,
    error: null,
    loading: true
    
  }
};

const adminSuccess = (state, action) => {
  return {
    ...state,
    admins: action.data,
    count:action.count,
    error: null,
    loading: false
  }
};

const adminFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}




const adminreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_PENDING:
      return adminStart(state, action);
    case actionTypes.ADMIN_SUCCESS:
      return adminSuccess(state, action);
    case actionTypes.ADMIN_FAILED:
      return adminFail(state, action);

    default:
      return state;
  }
};

export default adminreducer;
