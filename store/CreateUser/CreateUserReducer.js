import {
    CREATE_USER_FAILED,
    CREATE_USER_PENDING,
    CREATE_USER_SUCCESS
} from "./CreateUserActionType"

const initialStateUser = {
    isPending: false,
    createdUser: {},
    error: "",
  };

export const createUserReducer = (state = initialStateUser, action = {}) => {
    switch (action.type) {
        case CREATE_USER_PENDING:
          return Object.assign({}, state, { isPending: true });
        case CREATE_USER_SUCCESS:
          return Object.assign({}, state, {
            createdUser: action.payload,
            isPending: false,
          });
        case CREATE_USER_FAILED:
          return Object.assign({}, state, {
            error: action.payload,
            isPending: false,
          });
        default:
          return state;
      }
}