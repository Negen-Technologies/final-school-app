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
  ASSIGN_TEACHERS_FAILED,
  ASSIGN_TEACHERS_PENDING,
  ASSIGN_TEACHERS_SUCCESS,
  CHANGE_HOME_ROOM_PENDING,
  CHANGE_HOME_ROOM_SUCCESS,
  CHANGE_HOME_ROOM_FAILED,
} from "./AssignClassActionType";
import {
  REQUEST_STUDENTS_SUCCESS,
  REQUEST_STUDENTS_FAILED,
  REQUEST_STUDENTS_PENDING,
} from "../StudentFilter/StudentFilterActionType";
import { errorMessage, authErrorHandler, getClassList } from "../index";
import axios from "axios";
import URLst from "../../utils/constants";

export const assignClass = (classGrade, classSection) => {
  var classIdData;
  return (dispatch, getState) => {
    dispatch({ type: ASSIGN_CLASS_PENDING });
    const { token } = getState().auth;
    axios
      .get(URLst + `api/v1/classes/`, {
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
        axios
          .get(URLst + `api/v1/students`, {
            headers: {
              Authorization: `Bearer ${token}`,
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
          });
        axios
          .get(URLst + `api/v1/teachers`, {
            headers: {
              Authorization: `Bearer ${token}`,
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
          })
          .catch((error) => {
            dispatch({ type: GET_TEACHERS_FAILED, payload: error.response });
          });
      })
      .catch((error) => {
        dispatch({ type: ASSIGN_CLASS_FAILED, payload: error.response });
      });
  };
};

export const createClass = (classGrade, classSection) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_CLASS_PENDING });
    const { token } = getState().auth;
    axios
      .post(
        URLst + `api/v1/classes`,
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

export const assignStudent = (studentIds, classIdData) => {
  return (dispatch, getState) => {
    dispatch({ type: ASSIGN_STUDENT_PENDING });
    const { token } = getState().auth;
    axios
      .patch(
        URLst + `api/v1/students/assignClass`,
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
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: ASSIGN_STUDENT_FAILED, payload: errorData });
      });
  };
};

export const assignTeacher = (
  teacherIds,
  classIdData,
  courseId,
  academicYear
) => {
  return (dispatch, getState) => {
    dispatch({ type: ASSIGN_TEACHERS_PENDING });
    const { token } = getState().auth;
    axios
      .post(
        URLst + `api/v1/classes/teacher`,
        {
          teacherId: teacherIds,
          classId: classIdData,
          courseId: courseId,
          academicYear: academicYear,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: ASSIGN_TEACHERS_SUCCESS,
          payload: response.data.data.data,
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: ASSIGN_TEACHERS_FAILED, payload: errorData });
      });
  };
};

export const updateClassTeacher = (
  teacherIds,
  classIdData,
  courseId,
  academicYear
) => {
  return (dispatch, getState) => {
    dispatch({ type: ASSIGN_TEACHERS_PENDING });
    const { token } = getState().auth;
    axios
      .patch(
        URLst + `api/v1/classes/teacher`,
        {
          teacherId: teacherIds,
          classId: classIdData,
          courseId: courseId,
          academicYear: academicYear,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: ASSIGN_TEACHERS_SUCCESS,
          payload: response.data.data.data,
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: ASSIGN_TEACHERS_FAILED, payload: errorData });
      });
  };
};

export const changeHomeRoom = (teacherId, classId) => {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_HOME_ROOM_PENDING });
    const { token } = getState().auth;
    axios
      .patch(
        URLst + `api/v1/teacher/${teacherId}`,
        {
          homeroomId: classId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: CHANGE_HOME_ROOM_SUCCESS,
          payload: response.data.data.data,
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          dispatch(authErrorHandler(errorData, err.response.status));
        } else {
          errorData = err.message;
          dispatch(errorMessage(errorData));
        }
        dispatch({ type: CHANGE_HOME_ROOM_FAILED, payload: errorData });
      });
  };
};
