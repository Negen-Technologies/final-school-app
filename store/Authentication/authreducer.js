import * as actionTypes from "./authactionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
  data:{}
};

const authStart = (state, action) => {
  return  {
    ...state,
    error: null,
    loading: true
  }
};

const authSuccess = (state, action) => {
  localStorage.setItem("uuid",action.data.uuid)
  localStorage.setItem("name",action.data.name)
  localStorage.setItem("email",action.data.email)
  localStorage.setItem("phoneNumber",action.data.phoneNumber)
  localStorage.setItem("role",action.data.role);
  localStorage.setItem("url",action.data.url);
  return {
    ...state,
    token: action.token,
    data: action.data,
    error: null,
    loading: false
  }
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }}


const authLogout = (state, action) => {
  localStorage.clear()
  return  {...state,
    token: null,
    error: null,
    data:{}
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
