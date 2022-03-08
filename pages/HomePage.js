import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../store";
import { Row, Col, Select } from "antd";
import BarChart from "../Components/Dashboard Components/Carddash";
import SliderChart from "../Components/Dashboard Components/chart";
import LineChartComponent from "../Components/Dashboard Components/LineChart";
import { dashboardGetAttendanceStat } from "../store/Dashboard/dashboardAction";
import { getAllStudents } from "../store/StudentFilter/StudentFilterAction";
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import {
  getNotificationForMe,
  getMyNotification,
  addNotification,
} from "../store/Notification/NotificationAction";
import RankCard from "../Components/TeacherComponent/RankCard";
import { FilterOutlined } from "@ant-design/icons";
import { primary_color } from "../utils/constants";
import { getClassList } from "../store/ClassList/ClassListAction";
import { classRankAction } from "../store/ClassRank/classRankAction";
import { userStatsAction } from "../store/UserStats/userStatsAction";

function HomePage({
  getAttendanceStat,
  notification,
  myNotification,
  getAllStudents,
  getNotificationForMe,
  getMyNotification,
  loadingTrue,
  loadingFalse,
  getClassList,
  classList,
  classRank,
  classRankAction,
  userStatsAction,
  userStats
}) {
  const [selectedClass, setSelectedClass] = useState("");
  const [classWithCourse, setClassWithCourse] = useState([]);
  var classCourse = [];
  const dataTop = [];
  const dataBottom = [];

  useEffect(() => {
    getMyNotification();
    getNotificationForMe();
    getAttendanceStat();
    getAllStudents();
    getClassList();
    userStatsAction();
    // loadingFalse();

  }, []);
  

  useEffect(() => {
    var listClass = [];
    if (classList.length > 0) {
      classList.forEach((element) => {
        element.coursesList.length > 0 ? classCourse.push(element) : null;
      });
      listClass = classCourse;
      setClassWithCourse(classCourse);
      if (listClass.length > 0) {
        setSelectedClass(`${listClass[0].grade + "" + listClass[0].section}`);
        classRankAction(listClass[0].uuid);
      }
    }
  }, [classList]);

  classRank.length > 0
    ? dataTop.push(
        {
          title: `${
            classRank[0].rank +
            " " +
            classRank[0].firstName +
            classRank[0].lastName +
            " " +
            "(" +
            classRank[0].average +
            "%)"
          }`,
        },
        classRank.length > 1
          ? {
              title: `${
                classRank[1].rank +
                "  " +
                classRank[1].firstName +
                " " +
                classRank[1].lastName +
                " " +
                "(" +
                classRank[1].average +
                "%)"
              }`,
            }
          : {},
        classRank.length > 2
          ? {
              title: `${
                classRank[2].rank +
                "  " +
                classRank[2].firstName +
                classRank[2].lastName +
                " " +
                "(" +
                classRank[2].average +
                "%)"
              }`,
            }
          : {}
      )
    : {};

    classRank.length > 0
    ? dataBottom.push(
        {
          title: `${
            classRank[classRank.length - 1].rank +
            "  " +
            classRank[classRank.length - 1].firstName +
            " " +
            classRank[classRank.length - 1].lastName +
            " " +
            "(" +
            classRank[classRank.length - 1].average +
            "%)"
          }`,
        },
        classRank.length > 1
          ? {
              title: `${
                classRank[classRank.length - 2].rank +
                "  " +
                classRank[classRank.length - 2]
                  .firstName +
                " " +
                classRank[classRank.length - 2]
                  .lastName +
                " " +
                "(" +
                classRank[classRank.length - 2]
                  .average +
                "%)"
              }`,
            }
          : {},
        classRank.length > 2
          ? {
              title: `${
                classRank[classRank.length - 3].rank +
                "  " +
                classRank[classRank.length - 3]
                  .firstName +
                " " +
                classRank[classRank.length - 3]
                  .lastName +
                " " +
                "(" +
                classRank[classRank.length - 3]
                  .average +
                "%)"
              }`,
            }
          : {}
      )
    : {};

  return (
    <div>
      <Col span={24}>
        <Row>
          <Col xs={24} lg={12} xl={12}>
            <Row>
              <Col xs={12} lg={12} xl={12}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    // fontWeight: "bold",
                    color: primary_color,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Students Male and Female
                </h1>
                <div
                  style={{
                    height: "300px",
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <SliderChart userStats={userStats} />
                </div>
              </Col>
              <Col xs={12} lg={12} xl={12}>
                <div
                  style={{
                    height: "300px",
                    width: "95%",
                    alignSelf: "center",
                    borderRadius: "10px",
                  }}
                >
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      // fontWeight: "bold",
                      color: primary_color,
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    Students Attendance
                  </h1>
                  <BarChart />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <p
                style={{
                  marginTop: "5px",
                  marginRight: "20px",
                }}
              >
                Filter by Class:{" "}
              </p>
              <Col xs={6} xl={6} className="gutter-row">
                {classWithCourse.length > 0 ? (
                  <Select
                    style={{ width: "100%", marginBottom: "2px" }}
                    value={selectedClass}
                    onChange={(value) => {
                      setSelectedClass(value.split("*")[0]);
                      classRankAction(value.split("*")[1]);
                    }}
                    placeholder="Select Child"
                  >
                    {classWithCourse.map((cl) => (
                      <Select.Option
                        value={`${cl.grade + " " + cl.section + "*" + cl.uuid}`}
                        key={cl.uuid}
                      >
                        {cl.grade + " " + cl.section}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <div></div>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={18} lg={12} xl={12}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    // fontWeight: "bold",
                    color: primary_color,
                    marginTop: "5px",
                    marginBottom: "20px",
                    paddingRight: "120px",
                  }}
                >
                  Top Scores
                </h1>
                <RankCard
                  listOfClass={classList}
                  data={dataTop}
                  width={"95%"}
                  title={"Top Three Students"}
                  col={primary_color}
                />
              </Col>
              <Col xs={18} lg={12} xl={12}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    // fontWeight: "bold",
                    color: primary_color,
                    marginTop: "5px",
                    marginBottom: "20px",
                    paddingRight: "120px",
                  }}
                >
                  Low Scores
                </h1>
                <RankCard
                  listOfClass={classList}
                  data={dataBottom}
                  width={"95%"}
                  title={"Bottom Three Students"}
                  col={"red"}
                />
              </Col>
            </Row>
          </Col>

          <Col
            style={{
              height: "90vh",
              overflowY: "scroll",
            }}
            xs={24}
            lg={12}
            xl={12}
          >
            {notification.notifications.length > 0 ? (
              <NotificationsPagination
                notifications={notification.notifications.map(
                  (notification) => {
                    return {
                      name: notification.notificationInformation
                        .ownerInformation.name,
                      src: "",
                      content: notification.notificationInformation.text,
                    };
                  }
                )}
              ></NotificationsPagination>
            ) : (
              ""
            )}
            {myNotification.notifications.length > 0 ? (
              <NotificationsPagination
                notifications={myNotification.notifications.map(
                  (notification) => {
                    return {
                      name: `For - ${
                        notification.notificationInformation.length > 0
                          ? notification.notificationInformation[0].nfor
                          : ""
                      }`,
                      src: "",
                      content: notification.text,
                    };
                  }
                )}
                title="My Notifications"
              ></NotificationsPagination>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myNotification: state.myNotification,
    notification: state.notification,
    classList: state.classList.classes,
    classRank: state.classRank.studentRank,
    userStats: state.userStats.stats
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
    getAttendanceStat: () => dispatch(dashboardGetAttendanceStat()),
    getAllStudents: () => dispatch(getAllStudents()),
    getMyNotification: (value) => dispatch(getMyNotification(value)),
    getNotificationForMe: (value) => dispatch(getNotificationForMe(value)),
    getClassList: () => dispatch(getClassList()),
    classRankAction: (classId) => dispatch(classRankAction(classId)),
    userStatsAction: () => dispatch(userStatsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(HomePage));
