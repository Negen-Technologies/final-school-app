import axios from "axios";
import {
  CREATE_TEACHER_FAILED,
  CREATE_TEACHER_PENDING,
  CREATE_TEACHER_SUCCESS,
} from "./CreateTeacherActionType";
import URLst from "../../utils/constants";
import { teacherSuccess, teacherPending } from "../index";
import loadingFalse from "../store";
import errorMessage from "../store";

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

export const updateTeacher = (uuid, userData, teacherid) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(teacherPending());

    dispatch({ type: CREATE_TEACHER_PENDING });
    axios
      .patch(
        URLst + `api/v1/teachers/${teacherid}`,
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
        var newarr = getState().teacher.teachers;
        var index = newarr.findIndex((ele) => ele.uuid === teacherid);
        newarr[index] = response.data.data.data;

        dispatch(
          teacherSuccess({
            count: getState().teacher.count,
            rows: newarr,
          })
        );
      })
      .catch((error) => {
        dispatch({ type: CREATE_TEACHER_FAILED, payload: error.response });
        dispatch(loadingFalse());
        dispatch(errorMessage(error.response.data.message));
      });
  };
};
