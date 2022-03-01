import {
    CREATE_CHILD_FAILED,
    CREATE_CHILD_PENDING,
    CREATE_CHILD_SUCCESS
} from "./CreateChildActionType"

const initialStateChild = {
    isPending: false,
    createdChild: {},
    error: "",
  };

export const createChildReducer = (state = initialStateChild, action = {}) => {
    switch (action.type) {
        case CREATE_CHILD_PENDING:
          return Object.assign({}, state, { isPending: true });
        case CREATE_CHILD_SUCCESS:
          return Object.assign({}, state, {
            createdChild: action.payload,
            isPending: false,
          });
        case CREATE_CHILD_FAILED:
          return Object.assign({}, state, {
            error: action.payload,
            isPending: false,
          });
        default:
          return state;
      }
}