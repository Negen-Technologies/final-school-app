import axios from "axios";
import {
  CREATE_TEACHER_FAILED,
  CREATE_TEACHER_PENDING,
  CREATE_TEACHER_SUCCESS,
} from "./CreateTeacherActionType";
import URLst from "../../public/constants";

export const createTeacher = (userData) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    const { uuid } = getState().createUser.createdUser.user;
    console.log(getState().createUser);

    dispatch({ type: CREATE_TEACHER_PENDING });
    axios
      .post(
        URLst + `api/v1/teachers`,
        {
          userId: uuid,
          qualifiedCourses:userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
      console.log(response.data)
        dispatch({
          type: CREATE_TEACHER_SUCCESS,
          payload: response.data.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: CREATE_TEACHER_FAILED, payload: error.response });
        console.log(error.response);
      });
  };
};
