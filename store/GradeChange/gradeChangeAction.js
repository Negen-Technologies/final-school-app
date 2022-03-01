import axios from "axios";
import * as actionTypes from "./gradeChangeActionTypes";
import URLst from '../../public/constants'


export const gradeChangeStart = () => {
  return {
    type: actionTypes.GRADE_CHANGE_START
  };
};

export const gradeChangeSuccess = (message) => {
  return {
    type: actionTypes.GRADE_CHANGE_SUCCESS,
    message: message,
   
  };
};

export const gradeChangeFail = error => {

  return {
    type: actionTypes.GRADE_CHANGE_FAIL,
    error: error
  };
};



export const getAssessmentStart = () => {
  return {
    type: actionTypes.GET_ASSESSMENT_START
  };
};

export const getAssessmentSuccess = (message) => {
  return {
    type: actionTypes.GET_ASSESSMENT_SUCCESS,
    message: message,
   
  };
};

export const getAssessmentFail = error => {

  return {
    type: actionTypes.GET_ASSESSMENT_FAIL,
    error: error
  };
};


export const gradeChangeAction = (resultId, newResult, comment) => {
  var token=localStorage.getItem('token')
  
  console.log('FROM THE ACTION', resultId, newResult, comment)
  
  return dispatch => {
    dispatch(gradeChangeStart());
    
    axios
      .patch(URLst + 'api/v1/assessments/results/changeGrade',
      {
        resultId: resultId,
        newResult:newResult,
        comment: comment,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`}
      })
      .then(res => {
        console.log('in action', res.data.rows)
        const message = res.data.rows;
        
        dispatch(gradeChangeSuccess(message));
        
      })
      .catch(err => {
        var errorData;
        if (err.response!=null) {
       
          errorData=err.response.data.message
          console.log('in action', errorData)
        
        } else {
          errorData=err.message
          console.log('in action', errorData)

        }
        dispatch(gradeChangeFail(errorData));
      });
  };
};


export const getAssessment = (id) => {
  var token=localStorage.getItem('token')
      console.log('idRequest', id)
    return dispatch => {
      dispatch(getAssessmentStart());
      
      axios
        .get(URLst + `api/v1/assessments/result/forClassCourse/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`}
        })
        .then(res => {
          const message = res.data.data.data.rows;
          console.log('ACTION: ', res.data.data.data.rows)
          
          dispatch(getAssessmentSuccess(message));
          
        })
        .catch(err => {
          var errorData;
          if (err.response!=null) {
         
            errorData=err.response.data.message
          
          } else {
            errorData=err.message
          }
          dispatch(getAssessmentFail(errorData));
        });
    };
  };

