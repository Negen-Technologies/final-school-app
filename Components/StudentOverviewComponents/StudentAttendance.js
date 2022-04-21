import { Col, DatePicker, Row } from "antd";
import React, { useEffect, useState } from "react";
import AttendanceMonth from "../AttendanceComponents/AttendanceMonth";
import DaysLateCard from "../AttendanceComponents/DaysLateCard";
import { studentAttendanceDetail } from "../../store/AdminAttendance/AdminAttendanceAction";
import withAuth from "../../utils/protectRoute";
import { loadingTrue, loadingFalse } from "../../store";
import moment from "moment";

import { connect } from "react-redux";
function StudentAttendance({
  attendData,
  fromSingleStudent,
  studId,
  studentAttendanceDetail,
  adminAttendanceReducer,
  loadingTrue,
  loadingFalse,
  studentAttendance,
}) {
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  var lateryear;
  var previousyear;
  if (currentTime.getUTCMonth() + 1 < 9) {
    lateryear = year;
    previousyear = year - 1;
  } else {
    lateryear = year + 1;
    previousyear = year;
  }
  const attendance = [
    { monthNumber: 9, month: `${previousyear}-9-2`, absentDays: [] },
    { monthNumber: 10, month: `${previousyear}-10-2`, absentDays: [] },
    { monthNumber: 11, month: `${previousyear}-11-2`, absentDays: [] },
    { monthNumber: 12, month: `${previousyear}-12-2`, absentDays: [] },
    { monthNumber: 1, month: `${lateryear}-1-2`, absentDays: [] },
    { monthNumber: 2, month: `${lateryear}-2-2`, absentDays: [] },
    { monthNumber: 3, month: `${lateryear}-3-2`, absentDays: [] },
    { monthNumber: 4, month: `${lateryear}-4-2`, absentDays: [] },
    { monthNumber: 5, month: `${lateryear}-5-2`, absentDays: [] },
    { monthNumber: 6, month: `${lateryear}-6-2`, absentDays: [] },
    { monthNumber: 7, month: `${lateryear}-7-2`, absentDays: [] },
    { monthNumber: 8, month: `${lateryear}-8-2`, absentDays: [] },
  ];
  //currentTime.getUTCMonth() + 1 < 9 lateryear=year previous year=year-1 :lateryear=year+1 previous year=year

  var daysAbsent;
  if (fromSingleStudent) {
    var absentDays = [];

    studentAttendance.attendance.forEach((element) => {
      absentDays.push(element.day);

      var monthValue = `${element.year}-${element.month}-${element.day}`;
      attendance.forEach((e) => {

        if (e.monthNumber == element.month) {
          e.absentDays.push(element.day);
          e.month = monthValue;
        }
      });
    });
    daysAbsent = absentDays.length;
  } else {
    adminAttendanceReducer.studentAttendance.forEach((attend) => {
      var monthValue = `${attend.year}-${attend.month}-${attend.day}`;

      attendance.forEach((element) => {

        if (element.monthNumber == attend.month) {
          element.absentDays.push(attend.day);
          element.month = monthValue;
        }
      });
    });

    daysAbsent = adminAttendanceReducer.studentAttendance.length;
  }
  return attendData ? (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
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
              col="#FF0000"
            ></DaysLateCard>
          </Row>
        </Col>
      </Row>
      <Row>
        {attendance.map((eachMonth, i) => {
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
    </div>
  ) : (
    <div></div>
  );
}

const mapStateToProps = (state) => {
  return {
    studentAttendance: state.singleStudentAttendance,

    adminAttendanceReducer: state.adminAttendanceReducer,
    studentId: state.requestStudentsByFilter.selectedId,
    attendData: state.attendData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
    // studentAttendanceDetail: (studId) => dispatch(studentAttendanceDetail(studId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendance);
