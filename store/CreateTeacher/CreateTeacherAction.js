import axios from "axios";
import {
  CREATE_TEACHER_FAILED,
  CREATE_TEACHER_PENDING,
  CREATE_TEACHER_SUCCESS,
} from "./CreateTeacherActionType";
import URLst from "../../utils/constants";

export const createTeacher = (userData) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    const { uuid } = getState().createUser.createdUser.user;

    dispatch({ type: CREATE_TEACHER_PENDING });
    axios
      .post(
        URLst + `api/v1/teachers`,
        {
          userId: uuid,
          qualifiedCourses: userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: CREATE_TEACHER_SUCCESS,
          payload: response.data.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: CREATE_TEACHER_FAILED, payload: error.response });
      });
  };
};
