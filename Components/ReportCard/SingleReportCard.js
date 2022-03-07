import React from "react";
import { Button, Col, Input, Row, Select } from "antd";
import { primary_color } from "../../utils/constants";
import { getReportCardAction } from "../../store/ReportCard/reportCardAction";
import withAuth from "../../utils/protectRoute";
import { connect } from "react-redux";
import { getStudentAttendanceAction } from "../../store/Attendance/AttendanceAction";

function SingleReportCard({
  student,
  getReportCardAction,
  reportCard,
  getStudentAttendanceAction,
  attendanceDataS,
}) {
  // get report card when student changes
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  var start = new Date("2021-09-11");
  var end = Date.now();
  var days = [];
  var day = start;
  while (start <= end) {
    if (start.getDay() > 0 && start.getDay() <= 5) {
      day = new Date(start);
      days.push(day);
    }
    start.setDate(start.getDate() + 1);
  }

  React.useEffect(() => {
    if (student) {
      getReportCardAction(student.uuid);
      getStudentAttendanceAction(student.uuid);
    }
  }, [student]);

  return reportCard.reportCard ? (
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
              Name of student: {reportCard.reportCard.firstName}{" "}
              {reportCard.reportCard.lastName}
            </Col>
            <Col span={12}>
              Class: {reportCard.reportCard.grade}{" "}
              {reportCard.reportCard.section}
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col span={12}>Semester: 1</Col>
            <Col span={12}>School Year: 2014 </Col>
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
              {reportCard.reportCard.coursesList.map((subject, index) => {
                return (
                  <div
                    key={index}
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
                      <Col span={12}>{subject.courseName}</Col>
                      <Col span={3}>{subject.result}</Col>
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
              {["Total days of school", "Days Present", "Days Absent"].map(
                (subject, index) => {
                  return (
                    <div
                      key={index}
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
                        <Col span={12}>{subject}</Col>

                        <Col span={3}>
                          {index === 0
                            ? days.length
                            : index === 1
                            ? days.length -
                              attendanceDataS.studentAttendance.length
                            : attendanceDataS.studentAttendance.length}
                        </Col>
                        <Col span={3}>{subject.second}</Col>
                        <Col span={3}>{subject.third}</Col>
                        <Col span={3}>{subject.fourth}</Col>
                      </Row>
                    </div>
                  );
                }
              )}
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
              {["Total", "Average", "Rank"].map((subject, index) => {
                return (
                  <div
                    key={index}
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
                      <Col span={12}>{subject}</Col>
                      <Col span={3}>
                        {index === 0
                          ? reportCard.reportCard.totalResult
                          : index === 1
                          ? reportCard.reportCard.average
                          : reportCard.reportCard.rank}
                      </Col>
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
              ></div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    //students
    reportCard: state.getReportCard,
    attendanceDataS: state.attendanceData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //students
    getReportCardAction: (id) => dispatch(getReportCardAction(id)),
    getStudentAttendanceAction: (id) =>
      dispatch(getStudentAttendanceAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleReportCard);
