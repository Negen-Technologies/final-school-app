import axios from "axios";
import URLst from '../../public/constants'
import * as actionTypes from "./singleStudentAttendanceActionTypes";
import { loadingTrue, loadingFalse,errorMessage } from "../../store";

export const attendancePending = () => {
    return {
      type: actionTypes.SINGLE_STUDENT_ATTENDANCE_PENDING,
      isPending:true,
      
    };
  };
  
  export const attendanceSuccess = (data) => {
    return {
      type: actionTypes.SINGLE_STUDENT_ATTENDANCE_SUCCESS,
      isPending:false,
      data:data
      
    };
  };
  
  export const attendanceFail = error => {
  
    return {
      type: actionTypes.SINGLE_STUDENT_ATTENDANCE_FAILED,
      error: error,
      isPending:false

    };
  };


  
  export const getSingleStudentAttendance = (id) => {
      var token=localStorage.getItem('token')
  console.log('action id', id)
      return dispatch => {
        
        dispatch(attendancePending())
        // dispatch(loadingTrue());
      axios.get(
        URLst + `api/v1/attendance/student/${id}`,
        {
        headers: {
          'Authorization': `Bearer ${token}`}
        })
      .then(res => {
        console.log('ressss', res)
        dispatch({
          type: actionTypes.SINGLE_STUDENT_ATTENDANCE_SUCCESS,
          payload: {
            payload: res.data.data.days.rows,
            count: res.data.data.days.count,
            // classId: classId,
          },
        });
        // dispatch(loadingFalse());
      })
      .catch(err => {
        var errorData;
        
        if (err.response!=null) {
          errorData=err.response.data.message
          console.log(errorData)
        } else {
          errorData=err.message
          console.log(errorData)
        }
        dispatch(attendanceFail(errorData));
        dispatch(errorMessage(errorData))
        // dispatch(loadingFalse());

      });
      }
  }
