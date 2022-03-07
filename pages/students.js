import React, { useState, useEffect } from "react";
import StudentFilter from "../Components/StudentsFilter/StudentsFilterCriteria";
import { Space } from "antd";
import StudentTable from "../Components/StudentsFilter/StudentsTable";
import "../store/StudentFilter/StudentFilterAction";
import withAuth from "../utils/protectRoute";
import Router from "next/router";

function StudentFilterPage() {
  const [studentsList, setstudentsList] = useState([]);
  const [studentsid, setstudentsid] = useState(null);

  if (studentsid) {
    Router.push(
      {
        pathname: "/SingleStudent",
        query: { studentid: studentsid}
      }
      );
  }
  return (
    <div
      style={{
        width: "80vw",
        margin: "auto auto",
        marginTop: 12,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #DDDDDD",
          borderRadius: "5px",
          padding: "30px",
        }}
      >
        <div>
          <h1>Students Filter Page</h1>
          <StudentFilter isForGradeChange = {false} style={{ marginTop: "20px" }} />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #DDDDDD",
          borderRadius: "5px",
          padding: "10px 20px",
          marginTop: "10px",
        }}
      >
        <StudentTable
          getid={(id) => {
            setstudentsid(id);
          }}
        />
      </div>
    </div>
  );
}

export default withAuth(StudentFilterPage);
