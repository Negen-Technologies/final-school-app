import axios from "axios";
import {
  CREATE_TEACHER_FAILED,
  CREATE_TEACHER_PENDING,
  CREATE_TEACHER_SUCCESS,
} from "./CreateTeacherActionType";

export const createTeacher = (
  userData
) => {
  return (dispatch) => {
    dispatch({ type: CREATE_TEACHER_PENDING });
    axios
      .post(
        `https://dev-the-school-app.herokuapp.com/api/v1/users`,
        {
          qualifiedCourses: userData,
          
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhNjNmZGFlLTBkOTUtNDZiMS1hODEzLTYwMDkwOGU2ZGRlNiIsImlhdCI6MTYyMTQxMjE3MiwiZXhwIjoxNjI5MTg4MTcyfQ.axcmHpRqyPInCE863R-O68YCQs5LyosXYttmaZ2xh1k`,
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
        console.log(error);
      });
  };
};
