import axios from "axios";
import {
  CREATE_CHILD_FAILED,
  CREATE_CHILD_PENDING,
  CREATE_CHILD_SUCCESS,
} from "./CreateChildActionType";
import URLst from "../../public/constants";

export const createChild = (userData) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_CHILD_PENDING });
    const { token } = getState().auth;

    axios
      .post(
        URLst + `api/v1/students`,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          age: userData.age,
          grade: userData.grade.value,
          sex: userData.sex.value,
          parentId: userData.parentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: CREATE_CHILD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: CREATE_CHILD_FAILED, payload: error.response });
      });
  };
};
