import { Col, DatePicker, Row } from "antd";
import React, {useEffect, useState} from "react";
import AttendanceMonth from "../AttendanceComponents/AttendanceMonth";
import DaysLateCard from "../AttendanceComponents/DaysLateCard";
import {studentAttendanceDetail} from "../../store/AdminAttendance/AdminAttendanceAction"
import withAuth from '../../utils/protectRoute'
import { loadingTrue, loadingFalse } from "../../store";
import moment from "moment";

import { connect } from "react-redux";
function StudentAttendance({attendData, fromSingleStudent, studId, studentAttendanceDetail,adminAttendanceReducer, loadingTrue, loadingFalse, studentAttendance}) {


  const attendance = [
    {monthNumber:1, month: "2021-1-2", absentDays: [] },
    {monthNumber:2, month: "2021-2-2", absentDays: [] },
    {monthNumber:3, month: "2021-3-2", absentDays: [] },
    {monthNumber:4, month: "2021-4-2", absentDays: [] },
    {monthNumber:5, month: "2021-5-2", absentDays: [] },
    {monthNumber:6, month: "2021-6-2", absentDays: [] },
    {monthNumber:7, month: "2021-7-2", absentDays: [] },
    {monthNumber:8, month: "2021-8-2", absentDays: [] },
    {monthNumber:9, month: "2021-9-2", absentDays: [] },
    {monthNumber:10, month: "2021-10-2", absentDays: [] },
    {monthNumber:11, month: "2021-11-2", absentDays: [] },
    {monthNumber:12, month: "2021-12-2", absentDays: [] },
  ];

  var currentTime = new Date()
  var year = currentTime.getFullYear()
  var daysAbsent;
  if (fromSingleStudent) {
    var absentDays=[]

    studentAttendance.attendance.forEach(element => {
        absentDays.push(element.day)
      
      var monthValue = `${element.year}-${element.month}-${element.day}`
    attendance.forEach(e => {
      
      if (element.year === year) {
        var monArray = e.month.split('-')
        monArray[0] = element.year
        e.month = monArray.join('-')
      }
      
      if( e.monthNumber==element.month){
        e.absentDays.push(element.day)
        e.month = monthValue
     
      }
         
       });
    });
    daysAbsent = absentDays.length
  } else {
    adminAttendanceReducer.studentAttendance.forEach(attend => {
    
    var monthValue = `${attend.year}-${attend.month}-${attend.day}`

    attendance.forEach(element => {
      
      if (attend.year === year) {
        var monArray = element.month.split('-')
        monArray[0] = attend.year
        element.month = monArray.join('-')
      }
      
      if( element.monthNumber==attend.month){
        element.absentDays.push(attend.day)
        element.month = monthValue
     
      }
         
       });
  })

   daysAbsent = adminAttendanceReducer.studentAttendance.length
  }
  return (
    attendData ? <div style={{ backgroundColor: "white", padding: "10px" }}>
      <Row span={12} style={{ marginBottom: "10px" }} justify="space-between">
        <Col span={8}>
          <Row justify="space-between">
            <h1
              style={{ fontSize: "20px", fontWeight: 900, marginBottom: "0" }}
            >
              ATTENDANCE
            </h1>
          </Row>
        </Col>
        <Col span={11}>
          <Row justify="space-between">
            <DaysLateCard
              day={daysAbsent}
              label="Days Absent"
              col="#eb6841"
            ></DaysLateCard>
          
          </Row>
        </Col>
      </Row>
      <Row>
        {attendance.map((eachMonth,i) => {
          return (
            <Col key={i} span={8} xxl={8} xl={8} md={12} sm={12} xs={24}>
              <AttendanceMonth
                day={eachMonth.month}
                absentDays={eachMonth.absentDays}
              ></AttendanceMonth>
            </Col>
          );
        })}
      </Row>
    </div> : <div></div>
  );
}

const mapStateToProps = (state) => {
  return {
    studentAttendance: state.singleStudentAttendance,

    adminAttendanceReducer: state.adminAttendanceReducer,
    studentId: state.requestStudentsByFilter.selectedId,
    attendData: state.attendData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
    // studentAttendanceDetail: (studId) => dispatch(studentAttendanceDetail(studId)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAttendance);
