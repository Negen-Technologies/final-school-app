import * as actionTypes from "./parentOverviewActionTypes";

const initialState = {
  isPending: false,
  error: null,
  message:null
};



const parentOverviewStart = (state,) => {
  return  {
    ...state,
    message:null,
    error: null,
    isPending: true
  }
};

const parentOverviewSuccess = (state) => {
  return {
    ...state,
    message:"Children Information",
    error: null,
    isPending: false
  }
};

const parentOverviewFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    isPending: false
  }}



export const parentOverview = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PARENT_OVERVIEW_PENDING:
      return parentOverviewStart(state, );
    case actionTypes.PARENT_OVERVIEW_SUCCESS:
      return parentOverviewSuccess(state);
    case actionTypes.PARENT_OVERVIEW_FAILED:
      return parentOverviewFail(state, action);
    default:
      return state;
  }
};



