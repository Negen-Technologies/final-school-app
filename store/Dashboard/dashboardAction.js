import axios from "axios";
import * as actionTypes from "./dashboardActionTypes";
import URLst from '../../public/constants'



export const dashboardStart = () => {
  return {
    type: actionTypes.DASHBOARD_START
  };
};

export const dashboardSuccess = (message) => {
  return {
    type: actionTypes.DASHBOARD_SUCCESS,
    message: message,
   
  };
};

export const dashboardFail = error => {

  return {
    type: actionTypes.DASHBOARD_FAIL,
    error: error
  };
};

export const dashboardGetAttendanceStat = () => {
  var token=localStorage.getItem('token')

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var date = year+"-"+month+"-"+day;
    return dispatch => {
      dispatch(dashboardStart());
      
      axios
        .get(URLst + `api/v1/attendance/statistics/${date}`, {
          headers: {
            'Authorization': `Bearer ${token}`}
            
        })
        .then(res => {
          const message = res.data.data;
          console.log('ACTION: ', res.data.data)
          
          dispatch(dashboardSuccess(message));
          
        })
        .catch(err => {
          var errorData;
          if (err.response!=null) {
         
            errorData=err.response.data.message
          
          } else {
            errorData=err.message
          }
          dispatch(dashboardFail(errorData));
        });
    };
  };

