import * as actionTypes from "./StudentAssesmentActionType";

const initialState = {
  studentdata: {},
  error: null,
  loading: false,
};

const studentAssesmentStart = (state) => {
  return {
    ...state,
    studentdata: {},
    error: null,
    loading: true,
  };
};

const studentAssesmentSuccess = (state, action) => {
  return {
    ...state,
    studentdata: action.studentdata,
    error: null,
    loading: false,
  };
};

const studentAssesmentFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const studentassesmentreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STUDENT_ASSESMENT_PENDING:
      return studentAssesmentStart(state);
    case actionTypes.STUDENT_ASSESMENT_SUCCESS:
      return studentAssesmentSuccess(state, action);
    case actionTypes.STUDENT_ASSESMENT_FAILED:
      return studentAssesmentFail(state, action);
    default:
      return state;
  }
};

export default studentassesmentreducer;
