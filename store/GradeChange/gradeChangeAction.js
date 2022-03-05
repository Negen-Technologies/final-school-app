import axios from "axios";
import * as actionTypes from "./gradeChangeActionTypes";
import URLst from "../../public/constants";
import { loadingTrue, loadingFalse, errorMessage } from "../../store";

export const gradeChangeStart = () => {
  return {
    type: actionTypes.GRADE_CHANGE_START,
  };
};

export const gradeChangeSuccess = (message) => {
  return {
    type: actionTypes.GRADE_CHANGE_SUCCESS,
    message: message,
  };
};

export const gradeChangeFail = (error) => {
  return {
    type: actionTypes.GRADE_CHANGE_FAIL,
    error: error,
  };
};

export const getAssessmentStart = () => {
  return {
    type: actionTypes.GET_ASSESSMENT_START,
  };
};

export const getAssessmentSuccess = (message) => {
  return {
    type: actionTypes.GET_ASSESSMENT_SUCCESS,
    message: message,
  };
};

export const getAssessmentFail = (error) => {
  return {
    type: actionTypes.GET_ASSESSMENT_FAIL,
    error: error,
  };
};

export const gradeChangeAction = (resultId, newResult, comment, oldValue) => {
  console.log("FROM THE ACTION", resultId, newResult, comment);
  function getObjects(obj, key, val, newVal) {
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == "object") {
        objects = objects.concat(getObjects(obj[i], key, val, newValue));
      } else if (i == key && obj[key] == val) {
        obj[key] = "qwe";
      }
    }
    return obj;
  }

  return (dispatch, getState) => {
    dispatch(gradeChangeStart());
    dispatch(loadingTrue());
    const { token } = getState().auth;
    var assessmentData = getState().getAssessment.message;
    console.log("ass data", assessmentData, resultId);
    // console.log("row", row);
    // var indx = assessmentData.findIndex(x => x.uuid === row.key)

    const newData = [...assessmentData];
    var updatedObj = getObjects(newData, resultId, oldValue, newResult);
    // const index = newData.findIndex((ii) => id === ii.uuid);
    console.log("updatedObj", updatedObj);
    console.log("updatedObj newData", newData);
    // const thedata = newData[indx];
    // newData.splice(indx, 1, { ...thedata, ...row });

    console.log("new data", newData);

    axios
      .patch(
        URLst + "api/v1/assessments/results/changeGrade",
        {
          resultId: resultId,
          newResult: newResult,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("in action", res.data.data);
        const message = res.data.data;

        dispatch(gradeChangeSuccess(message));
        dispatch(getAssessmentSuccess(updatedObj));
        dispatch(
          getAssessment(
            getState().getAssessment.message[0].courseTeacherClassId
          )
        );
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log("in action", errorData);
        } else {
          errorData = err.message;
          console.log("in action", errorData);
        }
        dispatch(gradeChangeFail(errorData));
        dispatch(loadingFalse());
      });
  };
};

export const getAssessment = (id) => {
  var token = localStorage.getItem("token");
  console.log("idRequest", id);
  return (dispatch) => {
    dispatch(getAssessmentStart());

    axios
      .get(URLst + `api/v1/assessments/result/forClassCourse/${id}/semester2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const message = res.data.data.data.rows;
        console.log("ACTION: ", res.data.data.data.rows);

        dispatch(getAssessmentSuccess(message));
        dispatch(loadingFalse());
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log("error", errorData);
        } else {
          errorData = err.message;
          console.log("error", errorData);
        }
        dispatch(getAssessmentFail(errorData));
      });
  };
};
