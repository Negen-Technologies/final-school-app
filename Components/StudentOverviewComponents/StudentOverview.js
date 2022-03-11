import React from "react";
import { Col, DatePicker, Row } from "antd";
import moment from "moment";
import DaysLateCard from "../AttendanceComponents/DaysLateCard";
import AttendanceMonth from "../AttendanceComponents/AttendanceMonth";
import NotificationsPagination from "../NotificationComponents/NotificationsPagination";
import { index } from "../../pages";

const testNotifications = [
  {
    name: "Zorina Kimmerling",
    content:
      "Hi Thomas, this is Rex from LeanBits High. Our charity fair is scheduled for 16 & 17 May, 4 pm onwards. Tickets available on libertyhigh.edu/fair.",
  },
  {
    name: "Romonda De la Perrelle",
    content:
      "Liberty High: Admission for e-classes (Grade 1-3) now open. Few seats left! Register your ward on leanbits.edu/admissions21.",
  },
];

export default function StudentOverview({ studentAttendance }) {
  var absentDays = [];

  var today = moment().format("DD-MM-YYYY").split("-");
  studentAttendance.attendance.forEach((element) => {
    if (element.month == today[1]) {
      absentDays.push(element.day);
    }
  });

  function getPresentDays() {
    var counter = 0;
    for (let ind = 1; ind < parseInt(today[0]) - 1; ind++) {
      if (
        moment(`${ind}-03-2022`, "DD-MM-YYYY").format("dddd").toString() !==
        ("Saturday" || "Sunday")
      ) {
        counter++;
      }
    }
    return counter - absentDays.length;
  }

  return (
    <div>
      {studentAttendance.loading || studentAttendance.error ? (
        <div></div>
      ) : (
        <div>
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
              </Row>
            </Col>
            <Col span={8}>
              <Row justify="space-around">
                <DaysLateCard
                  day={absentDays.length}
                  label="Days Absent"
                  col="#eb6841"
                ></DaysLateCard>
                <DaysLateCard
                  day={getPresentDays()}
                  label="Days Present"
                  col="#9ec583"
                ></DaysLateCard>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={12}
              xxl={12}
              style={{
                overflow: "auto",
              }}
            >
              <AttendanceMonth
                day={moment().format("YYYY-MM-DD").toString()}
                absentDays={absentDays}
                width="500px"
              ></AttendanceMonth>
            </Col>
            <Col
              span={12}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={12}
              xxl={12}
              style={{
                overflow: "auto",
              }}
            >
              <NotificationsPagination
                notifications={testNotifications.map((notification) => {
                  return {
                    name: notification.name,
                    src: "",
                    content: notification.content,
                  };
                })}
              ></NotificationsPagination>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
