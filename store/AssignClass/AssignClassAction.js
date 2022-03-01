import {
  ASSIGN_CLASS_PENDING,
  ASSIGN_CLASS_SUCCESS,
  ASSIGN_CLASS_FAILED,
  CREATE_CLASS_PENDING,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAILED,
  CREATE_CLASS_CLEAR_SUCCESS,
  GET_TEACHERS_PENDING,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAILED,
  ASSIGN_STUDENT_PENDING,
  ASSIGN_STUDENT_SUCCESS,
  ASSIGN_STUDENT_FAILED,
} from "./AssignClassActionType";
import {
  REQUEST_STUDENTS_SUCCESS,
  REQUEST_STUDENTS_FAILED,
  REQUEST_STUDENTS_PENDING,
} from "../StudentFilter/StudentFilterActionType";
import { errorMessage, authErrorHandler, getClassList } from "../index";
import axios from "axios";

export const assignClass = (classGrade, classSection) => {
  var classIdData;
  return (dispatch, getState) => {
    dispatch({ type: ASSIGN_CLASS_PENDING });
    const { token } = getState().auth;
    axios
      .get(`https://dev-the-school-app.herokuapp.com/api/v1/classes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          grade: classGrade,
          section: classSection,
        },
      })
      .then((response) => {
        dispatch({
          type: ASSIGN_CLASS_SUCCESS,
          payload: response.data.data.data,
        });
        classIdData = response.data.data.data;
        console.log(classIdData);
        axios
          .get(`https://dev-the-school-app.herokuapp.com/api/v1/students`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhNjNmZGFlLTBkOTUtNDZiMS1hODEzLTYwMDkwOGU2ZGRlNiIsImlhdCI6MTYyMTQxMjE3MiwiZXhwIjoxNjI5MTg4MTcyfQ.axcmHpRqyPInCE863R-O68YCQs5LyosXYttmaZ2xh1k`,
            },
            params: {
              classId: response.data.data.data.uuid,
            },
          })
          .then((response) => {
            dispatch({
              type: REQUEST_STUDENTS_SUCCESS,
              payload: response.data.data.data,
            });
          })
          .catch((error) => {
            dispatch({
              type: REQUEST_STUDENTS_FAILED,
              payload: error.response,
            });
            console.log(error);
          });
        axios
          .get(`https://dev-the-school-app.herokuapp.com/api/v1/teachers`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhNjNmZGFlLTBkOTUtNDZiMS1hODEzLTYwMDkwOGU2ZGRlNiIsImlhdCI6MTYyMTQxMjE3MiwiZXhwIjoxNjI5MTg4MTcyfQ.axcmHpRqyPInCE863R-O68YCQs5LyosXYttmaZ2xh1k`,
            },
            params: {
              myClasses: response.data.data.data.uuid,
            },
          })
          .then((response) => {
            dispatch({
              type: GET_TEACHERS_SUCCESS,
              payload: response.data.data.data,
            });
            console.log("00000000000000000000");
            console.log(response.data.data.data);
          })
          .catch((error) => {
            dispatch({ type: GET_TEACHERS_FAILED, payload: error.response });
            console.log(error);
          });
      })
      .catch((error) => {
        dispatch({ type: ASSIGN_CLASS_FAILED, payload: error.response });
        console.log(error);
      });
  };
};

export const createClass = (classGrade, classSection) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_CLASS_PENDING });
    const { token } = getState().auth;
    axios
      .post(
        `https://dev-the-school-app.herokuapp.com/api/v1/classes`,
        {
          section: classSection,
          grade: classGrade,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: CREATE_CLASS_SUCCESS,
          payload: response.data.data.data,
        });
        dispatch(getClassList());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log(err.response.status);
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: CREATE_CLASS_FAILED, payload: errorData });
      });
  };
};

export const clearCreateClass = () => {
  return (dispatch) => {
    dispatch({ type: CREATE_CLASS_CLEAR_SUCCESS });
  };
};

export const assignTeacher = (
  teacherId,
  courseId,
  classIdData,
  academicYear
) => {
  return (dispatch) => {
    dispatch({ type: CREATE_CLASS_PENDING });
    axios
      .post(
        `https://dev-the-school-app.herokuapp.com/api/v1/classes`,
        {
          teacherId: teacherId,
          courseId: courseId,
          classId: classIdData.uuid,
          academicYear: academicYear,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhNjNmZGFlLTBkOTUtNDZiMS1hODEzLTYwMDkwOGU2ZGRlNiIsImlhdCI6MTYyMTQxMjE3MiwiZXhwIjoxNjI5MTg4MTcyfQ.axcmHpRqyPInCE863R-O68YCQs5LyosXYttmaZ2xh1k`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: CREATE_CLASS_SUCCESS,
          payload: response.data.data.data,
        });
        console.log(response.data.data.data);
      })
      .catch((error) => {
        dispatch({ type: CREATE_CLASS_FAILED, payload: error.response });
        console.log(error);
      });
  };
};

export const assignStudent = (studentIds, classIdData) => {
  return (dispatch, getState) => {
    dispatch({ type: ASSIGN_STUDENT_PENDING });
    const { token } = getState().auth;
    axios
      .patch(
        `https://dev-the-school-app.herokuapp.com/api/v1/students/assignClass`,
        {
          studentsId: studentIds,
          classId: classIdData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: ASSIGN_STUDENT_SUCCESS,
          payload: response.data.data.data,
        });
        console.log(response.data.data.data);
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log(err.response.status);
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: ASSIGN_STUDENT_FAILED, payload: errorData });
      });
  };
};
