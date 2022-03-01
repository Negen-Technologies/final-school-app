import React from "react";
import { Button, Col, Input, Row, Select } from "antd";
import { primary_color } from "../../public/constants";
const studentInformation = {
  name: "Eyasu Sisay",
  grade: 10,
  section: "A",
  semester: "First",
};

const subjects = [
  { name: "Biology", id: 1, first: 90, second: 80, third: 50, fourth: 70 },
  { name: "Chemistry", id: 2, first: 97, second: 80, third: 50, fourth: 70 },
  { name: "Physics", id: 3, first: 59, second: 80, third: 50, fourth: 70 },
  { name: "Mathematics", id: 4, first: 100, second: 80, third: 50, fourth: 70 },
  { name: "History", id: 5, first: 78, second: 80, third: 50, fourth: 70 },
  { name: "Geography", id: 6, first: 90, second: 80, third: 50, fourth: 70 },
  { name: "Physics", id: 3, first: 59, second: 80, third: 50, fourth: 70 },
  { name: "Physics", id: 3, first: 59, second: 80, third: 50, fourth: 70 },
];

const comment =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
const attendance = ["Total days of school", "Days present", "Days absent"];
const attendanceData = [
  {
    name: "Total days of school",
    first: "100",
    second: "90",
    third: "95",
    fourth: "90",
  },
  {
    name: "Days present",
    first: "100",
    second: "88",
    third: "95",
    fourth: "85",
  },
  {
    name: "Days absent",
    first: "0",
    second: "2",
    third: "0",
    fourth: "5",
  },
];
const grade = ["Total value", "Average value", "Rank"];
const gradeData = [
  {
    name: "Total value",
    first: "1000",
    second: "900",
    third: "950",
    fourth: "900",
  },
  {
    name: "Average value",
    first: "100",
    second: "90",
    third: "95",
    fourth: "90",
  },
  {
    name: "Rank",
    first: "1",
    second: "8",
    third: "9",
    fourth: "5",
  },
];
export default function SingleReportCard({ student }) {
  return student ? (
    <div
      style={{
        border: "1px solid grey",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Row
        style={{
          height: "100px",
          borderBottom: "1px solid #e8e8e8",
          backgroundColor: primary_color,
        }}
        align="middle"
        justify="center"
      >
        <h1 style={{ color: "white", fontWeight: "bolder" }}>Report Card</h1>
      </Row>
      <div style={{ padding: "0px 40px 40px 40px" }}>
        <div
          style={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "500",
            color: "#354A54",
          }}
        >
          <Row style={{ paddingTop: "20px" }}>
            <Col span={12}>
              Name of student: {student.firstName} {student.lastName}
            </Col>
            <Col span={12}>
              Class: {student.grade} {student.section}
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col span={12}>Semester: {studentInformation.semester} </Col>
            <Col span={12}>School Year: 2013 </Col>
          </Row>
        </div>
        <div>
          <Row style={{}}>
            <Col span={11}>
              <div
                style={{
                  backgroundColor: "#C44B77",
                  height: "50px",
                  padding: "5px",
                  color: "white",
                }}
              >
                <Row
                  style={{
                    height: "100%",
                  }}
                  align="middle"
                >
                  <Col span={12}>Subjects</Col>
                  <Col span={3}>1st</Col>
                  <Col span={3}>2nd</Col>
                  <Col span={3}>3rd</Col>
                  <Col span={3}>4th</Col>
                </Row>
              </div>
              {subjects.map((subject, index) => {
                return (
                  <div
                    style={
                      index % 2 !== 0
                        ? {
                            backgroundColor: "#E9F3F3",
                            height: "50px",
                            padding: "5px",
                            color: "#354A54",
                          }
                        : {
                            backgroundColor: "white",
                            height: "50px",
                            padding: "5px",
                            color: "#354A54",
                          }
                    }
                  >
                    <Row
                      style={{
                        height: "100%",
                      }}
                      align="middle"
                    >
                      <Col span={12}>{subject.name}</Col>
                      <Col span={3}>{subject.first}</Col>
                      <Col span={3}>{subject.second}</Col>
                      <Col span={3}>{subject.third}</Col>
                      <Col span={3}>{subject.fourth}</Col>
                    </Row>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: "20px",
                  border: "10px solid #BED6DE",
                  padding: "20px",
                  color: "#354A54",
                }}
              >
                <h1 style={{ color: "#006577" }}>Grade System</h1>
                <p>
                  100 - 90: <strong>Very Grate Distinction</strong>
                </p>
                <p>
                  89 - 80: <strong>Grate Distinction</strong>
                </p>
                <p>
                  79 - 70: <strong>Distinction</strong>
                </p>
                <p>
                  69 - 60: <strong>Satisfactory</strong>
                </p>
                <p>
                  59 - 50: <strong>Pass</strong>
                </p>
                <p>
                  Below 50: <strong>Fail</strong>
                </p>
              </div>
            </Col>
            <Col span={1}></Col>
            <Col span={12}>
              <div
                style={{
                  backgroundColor: "#D1AC62",
                  height: "50px",
                  padding: "5px",
                  color: "white",
                }}
              >
                <Row
                  style={{
                    height: "100%",
                  }}
                  align="middle"
                >
                  <Col span={12}>Attendance</Col>
                  <Col span={3}>1st</Col>
                  <Col span={3}>2nd</Col>
                  <Col span={3}>3rd</Col>
                  <Col span={3}>4th</Col>
                </Row>
              </div>
              {attendanceData.map((subject, index) => {
                return (
                  <div
                    style={
                      index % 2 !== 0
                        ? {
                            backgroundColor: "#E9F3F3",
                            height: "50px",
                            padding: "5px",
                            color: "#354A54",
                          }
                        : {
                            backgroundColor: "white",
                            height: "50px",
                            padding: "5px",
                            color: "#354A54",
                          }
                    }
                  >
                    <Row
                      style={{
                        height: "100%",
                      }}
                      align="middle"
                    >
                      <Col span={12}>{subject.name}</Col>
                      <Col span={3}>{subject.first}</Col>
                      <Col span={3}>{subject.second}</Col>
                      <Col span={3}>{subject.third}</Col>
                      <Col span={3}>{subject.fourth}</Col>
                    </Row>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: "50px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#92C089",
                  height: "50px",
                  padding: "5px",
                  color: "white",
                }}
              >
                <Row
                  style={{
                    height: "100%",
                  }}
                  align="middle"
                >
                  <Col span={12}>Total Grade</Col>
                  <Col span={3}>1st</Col>
                  <Col span={3}>2nd</Col>
                  <Col span={3}>3rd</Col>
                  <Col span={3}>4th</Col>
                </Row>
              </div>
              {gradeData.map((subject, index) => {
                return (
                  <div
                    style={
                      index % 2 !== 0
                        ? {
                            backgroundColor: "#E9F3F3",
                            height: "50px",
                            padding: "5px",
                            color: "#354A54",
                          }
                        : {
                            backgroundColor: "white",
                            height: "50px",
                            padding: "5px",
                            color: "#354A54",
                          }
                    }
                  >
                    <Row
                      style={{
                        height: "100%",
                      }}
                      align="middle"
                    >
                      <Col span={12}>{subject.name}</Col>
                      <Col span={3}>{subject.first}</Col>
                      <Col span={3}>{subject.second}</Col>
                      <Col span={3}>{subject.third}</Col>
                      <Col span={3}>{subject.fourth}</Col>
                    </Row>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#006577",
                  color: "white",
                  height: "70px",
                }}
              >
                <h4
                  style={{
                    color: "white",
                    margin: "auto auto",
                    textAlign: "center",
                  }}
                >
                  Teacher's Feedback
                </h4>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  color: "#006577",
                  height: "260px",
                  padding: "20px",
                }}
              >
                {comment}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  ) : null;
}
