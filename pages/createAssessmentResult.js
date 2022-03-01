import React from 'react';
import withAuth from '../utils/protectRoute'
import StudentFilter from "../Components/StudentsFilter/StudentsFilterCriteria"

function createAssessmentResult() {
  return <div style = {{
    padding: 16,
  }}>
      <StudentFilter 
      isForCreateAssessment = {true} 
      style={{ marginTop: "20px" }}
      isAssessmentRequested = {(value) => {
        //console.log("888888888888888888", value);
      }}
       />
  </div>;
}

export default withAuth(createAssessmentResult);
