import React from "react";
import { Col, DatePicker, Row } from "antd";
import moment from "moment";
import DaysLateCard from "../AttendanceComponents/DaysLateCard";
import AttendanceMonth from "../AttendanceComponents/AttendanceMonth";
import RecentNotifications from "../NotificationComponents/RecentNotifications";

const testNotifications = [
  {
    title: "Card title 1",
    subject: "This is the description",
  },
  {
    title: "Card title 2",
    subject: "This is the description",
  },
];

export default function StudentOverview({studentAttendance}) {

var absentDays=[]

var today=moment().format("DD-MM-YYYY").split('-')
console.log("abcdd", studentAttendance)
studentAttendance.attendance.forEach(element => {
  if (element.month==today[1]){
    absentDays.push(element.day)
  }
});


  return (
    <div>
      {studentAttendance.loading||studentAttendance.error?
      <div></div>
      :<div>
      <Row style={{ marginBottom: "10px" }} justify="space-between">
        <Col span={7}>
          <Row justify="space-between">
            <h1
              style={{
                fontSize: "25px",
                fontWeight: 900,
                marginBottom: "0",
              }}
            >
              OVERVIEW
            </h1>
            <DatePicker
              style={{ border: "1px solid grey", margin: "10px" }}
              size="small"
            />
          </Row>
        </Col>
        <Col span={8}>
          <Row justify="space-between">
            <DaysLateCard
              day={absentDays.length}
              label="Days Absent"
              col="#eb6841"
            ></DaysLateCard>
            <DaysLateCard
              day={parseInt(moment().format("DD-MM-YYYY").split('-')[0])-absentDays.length}
              label="Days Present"
              col="#9ec583"
            ></DaysLateCard>
            {/* <DaysLateCard
              day={5}
              label="Days Without Record"
              width="180px"
              col="#cccccc"
            ></DaysLateCard> */}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
          <AttendanceMonth
            day={moment().format("YYYY-MM-DD").toString()}
            absentDays={absentDays}
            width="500px"
          ></AttendanceMonth>
        </Col>
        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
          <RecentNotifications
            notifications={testNotifications}
          ></RecentNotifications>
        </Col>
      </Row>
      </div>
}
   </div>
  );
}
