import * as actionTypes from "./reportCardActionTypes";

const initialState = {
  reportCards: [],
  error: null,
  loading: false,
  success: false,
};

const reportCardState = {
  reportCard: null,
  error: null,
  loading: false,
  success: false,
};

const createReportCardStart = (state) => {
  return {
    ...state,
    reportCards: [],
    error: null,
    loading: true,
  };
};

const getReportCardStart = (state) => {
  return {
    ...state,
    reportCard: null,
    error: null,
    loading: true,
  };
};

const createReportCardSuccess = (state, action) => {
  return {
    ...state,
    reportCards: action.message,
    success: true,
    error: null,
    loading: false,
  };
};

const getReportCardSuccess = (state, action) => {
  return {
    ...state,
    reportCard: action.message,
    success: true,
    error: null,
    loading: false,
  };
};

const createReportCardFail = (state, action) => {
  return {
    reportCards: [],
    error: action.error,
    loading: false,
    success: false,
  };
};

const getReportCardFail = (state, action) => {
  return {
    reportCard: null,
    error: action.error,
    loading: false,
    success: false,
  };
};
export const createReportCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REPORT_CARD_START:
      return createReportCardStart(state);
    case actionTypes.CREATE_REPORT_CARD_SUCCESS:
      return createReportCardSuccess(state, action);
    case actionTypes.CREATE_REPORT_CARD_FAILED:
      return createReportCardFail(state, action);
    default:
      return state;
  }
};

export const getReportCardReducer = (state = reportCardState, action) => {
  switch (action.type) {
    case actionTypes.GET_REPORT_CARD_START:
      return getReportCardStart(state);
    case actionTypes.GET_REPORT_CARD_SUCCESS:
      return getReportCardSuccess(state, action);
    case actionTypes.GET_REPORT_CARD_FAILED:
      return getReportCardFail(state, action);
    default:
      return state;
  }
};
