import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Row, Col, Divider, Select, Carousel } from "antd";
import { useRouter } from "next/router";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../store";
import ClassCard from "../Components/TeacherComponent/ClassCard";
import RankCard from "../Components/TeacherComponent/RankCard";
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import { teacherGetMeAction } from "../store/TeacherGetMe/teacherGetMeAction";
import { classRankAction } from "../store/ClassRank/classRankAction";
import { primary_color } from "../public/constants";
import {
  getNotificationForMe,
  getMyNotification,
  addNotification,
} from "../store/Notification/NotificationAction";
import { getClassList } from "../store/ClassList/ClassListAction";

function teacherHomePage({
  loadingTrue,
  getNotificationForMe,
  getMyNotification,
  notification,
  myNotification,
  loadingFalse,
  classRank,
  classRankAction,
  teacherGetMeAction,
  teacherGetMe,
  getClassList,
  classList,
}) {
  var myClasses = [];
  var router = useRouter();
  const [value, setValue] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const options = [];
  var placeholder = loading ? "Loading..." : "Select student...";
  const dataTop = [];
  const dataBottom = [];
  const [selectedClass, setSelectedClass] = useState("");
  const [classWithCourse, setClassWithCourse] = useState([]);
  var classCourse = [];

  useEffect(() => {
    getMyNotification();
    getNotificationForMe();
    teacherGetMeAction();
    // getClassList();
    teacherGetMeAction();
    loadingFalse();
  }, []);
  // useEffect(() => {
  // loadTeacherData();
  // }, [teacherGetMe]);

  useEffect(() => {
    var listClass = [];

    // listClass > 0 ? classRankAction(listClass[0].uuid) : null;

    myClasses = teacherGetMe.data ? teacherGetMe.data.myClasses : [];
    if (myClasses.length > 0) {
      console.log("dddddddddddd", teacherGetMe.data, myClasses);

      classRankAction(myClasses[0].classId, "2014");
      // myClasses.forEach((element) => {
      //   element.length > 0 ? classCourse.push(element) : null;
      // });
      // listClass = classCourse;
      setClassWithCourse(myClasses);
    }

    myClasses.length > 0
      ? setSelectedClass(
          `${
            myClasses[0].classInformation.grade +
            "" +
            myClasses[0].classInformation.section
          }`
        )
      : null;
  }, [teacherGetMe]);

  console.log("classCourse", classWithCourse);
  // const loadTeacherData = () => {
  //   myClasses = teacherGetMe.hasOwnProperty("data")
  //     ? teacherGetMe.data.myClasses
  //     : [];
  //   if (myClasses.length > 0) {
  //     classRankAction(myClasses[0].classId, "2014");
  //   }
  //   loadingFalse();
  // };
  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
      label: `neymar: ${value}`,
      value,
    });
  }
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  classRank.studentRank.length > 0
    ? dataTop.push(
        {
          title: `${
            classRank.studentRank[0].rank +
            " " +
            classRank.studentRank[0].firstName +
            classRank.studentRank[0].lastName +
            " " +
            "(" +
            (classRank.studentRank[0].average
              ? classRank.studentRank[0].average
              : " _") +
            "%)"
          }`,
        },
        classRank.studentRank.length > 1
          ? {
              title: `${
                classRank.studentRank[1].rank +
                "  " +
                classRank.studentRank[1].firstName +
                " " +
                classRank.studentRank[1].lastName +
                " " +
                "(" +
                (classRank.studentRank[1].average
                  ? classRank.studentRank[1].average
                  : " _") +
                "%)"
              }`,
            }
          : {},
        classRank.studentRank.length > 2
          ? {
              title: `${
                classRank.studentRank[2].rank +
                "  " +
                classRank.studentRank[2].firstName +
                classRank.studentRank[2].lastName +
                " " +
                "(" +
                (classRank.studentRank[2].average
                  ? classRank.studentRank[2].average
                  : " _") +
                "%)"
              }`,
            }
          : {}
      )
    : {};
  //[classRank.studentRank.length - 1]
  classRank.studentRank.length > 0
    ? dataBottom.push(
        {
          title: `${
            classRank.studentRank[classRank.studentRank.length - 1].rank +
            "  " +
            classRank.studentRank[classRank.studentRank.length - 1].firstName +
            " " +
            classRank.studentRank[classRank.studentRank.length - 1].lastName +
            " " +
            "(" +
            (classRank.studentRank[classRank.studentRank.length - 1].average
              ? classRank.studentRank[classRank.studentRank.length - 1].average
              : " _") +
            "%)"
          }`,
        },
        classRank.studentRank.length > 1
          ? {
              title: `${
                classRank.studentRank[classRank.studentRank.length - 2].rank +
                "  " +
                classRank.studentRank[classRank.studentRank.length - 2]
                  .firstName +
                " " +
                classRank.studentRank[classRank.studentRank.length - 2]
                  .lastName +
                " " +
                "(" +
                (classRank.studentRank[classRank.studentRank.length - 2].average
                  ? classRank.studentRank[classRank.studentRank.length - 2]
                      .average
                  : " _") +
                "%)"
              }`,
            }
          : {},
        classRank.studentRank.length > 2
          ? {
              title: `${
                classRank.studentRank[classRank.studentRank.length - 3].rank +
                "  " +
                classRank.studentRank[classRank.studentRank.length - 3]
                  .firstName +
                " " +
                classRank.studentRank[classRank.studentRank.length - 3]
                  .lastName +
                " " +
                "(" +
                (classRank.studentRank[classRank.studentRank.length - 3].average
                  ? classRank.studentRank[classRank.studentRank.length - 3]
                      .average
                  : " _") +
                "%)"
              }`,
            }
          : {}
      )
    : {};

  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      <div>
        <Row>
          <Col xs={24} lg={12} xl={12}>
            <div
              style={{
                paddingLeft: "15px",
              }}
            >
              <Col
                xs={24}
                xl={24}
                style={{
                  marginRight: "5px",
                  marginLeft: "20px",
                }}
                className="gutter-row"
              >
                {classWithCourse.length > 0 ? (
                  <Select
                    style={{ width: "100%", marginBottom: "2px" }}
                    value={selectedClass}
                    onChange={(value) => {
                      console.log("value", value.split("*")[1]);
                      setSelectedClass(value.split("*")[0]);
                      classRankAction(value.split("*")[1]);
                    }}
                    placeholder="Select Child"
                  >
                    {classWithCourse.map((cl) => (
                      <Select.Option
                        value={`${
                          cl.classInformation.grade +
                          " " +
                          cl.classInformation.section +
                          "*" +
                          cl.classInformation.uuid
                        }`}
                        key={cl.uuid}
                      >
                        {cl.classInformation.grade +
                          " " +
                          cl.classInformation.section}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <div></div>
                )}
              </Col>
              <div
                style={{
                  paddingTop: "30px",
                }}
              >
                <Divider
                  orientation="left"
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    // fontWeight: "bold",
                    color: primary_color,
                    marginTop: "20px",
                    marginBottom: "20px",
                    paddingRight: "120px",
                  }}
                >
                  Top Scores
                </Divider>
                <RankCard
                  width={"95%"}
                  title={"Top Three Students"}
                  data={dataTop}
                  col={primary_color}
                />
              </div>
              <div
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              >
                <Divider
                  orientation="left"
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    // fontWeight: "bold",
                    color: primary_color,
                    marginTop: "20px",
                    marginBottom: "20px",
                    paddingRight: "120px",
                  }}
                >
                  Low Scores
                </Divider>
                <RankCard
                  width={"95%"}
                  title={"Bottom Three Students"}
                  data={dataBottom}
                  col={"red"}
                />
              </div>
            </div>
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
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    classRank: state.classRank,
    teacherGetMe: state.teacherGetMe.teacher,
    myNotification: state.myNotification,
    notification: state.notification,
    classList: state.classList.classes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    teacherGetMeAction: () => dispatch(teacherGetMeAction()),
    classRankAction: (classId) => dispatch(classRankAction(classId)),
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
    getMyNotification: (value) => dispatch(getMyNotification(value)),
    getNotificationForMe: (value) => dispatch(getNotificationForMe(value)),
    getClassList: () => dispatch(getClassList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(teacherHomePage));
