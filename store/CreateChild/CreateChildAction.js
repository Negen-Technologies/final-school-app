import axios from "axios";
import {
  CREATE_CHILD_FAILED,
  CREATE_CHILD_PENDING,
  CREATE_CHILD_SUCCESS,
} from "./CreateChildActionType";
import URLst from '../../public/constants'

export const createChild = (
  userData
) => {
  var token=localStorage.getItem('token')
  console.log(userData.firstName, userData.lastName)
  return (dispatch) => {
    dispatch({ type: CREATE_CHILD_PENDING });
    const { token } = getState().auth;

    axios
      .post(
        URLst + `api/v1/students`,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          age: userData.age,
          grade: userData.grade,
          sex: userData.sex.value,
          parentId: userData.parentId,
          grade: userData.grade.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response)

        dispatch({
          type: CREATE_CHILD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error)

        dispatch({ type: CREATE_CHILD_FAILED, payload: error.response });
        console.log(error);
      });
  };
};
