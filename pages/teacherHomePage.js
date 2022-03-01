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
}) {
  var myClasses = [];
  var router = useRouter();
  useEffect(() => {
    getMyNotification();
    getNotificationForMe();
    teacherGetMeAction();
  }, []);
  useEffect(() => {
    loadTeacherData();
  }, [teacherGetMe]);

  const loadTeacherData = () => {
    myClasses = teacherGetMe.hasOwnProperty("data")
      ? teacherGetMe.data.myClasses
      : [];
    if (myClasses.length > 0) {
      classRankAction(myClasses[0].classId, "2014");
    }
    loadingFalse();
  };
  console.log(
    "TEACHER GET ME: ",
    teacherGetMe.data ? teacherGetMe.data.myClasses : ""
  );
  const [value, setValue] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const options = [];
  var placeholder = loading ? "Loading..." : "Select student...";
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

  const contentStyle = {
    height: "160px",
    color: "black",
    lineHeight: "160px",
    textAlign: "center",
  };
  
  const selectPropsSearch = {
    loading,
    size: "large",
    mode: "multiple",
    style: { width: "100%" },
    value,
    options,
    disabled: loading,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder,
    maxTagCount: "responsive",
    allowClear: true,
    filterOption: (inputValue, data) =>
      data.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
  };
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
                paddingTop: "30px",
              }}
            >
              <div
                style={{
                  paddingTop: "30px",
                }}
              >
                <RankCard width= {'95%'} title={"Top Three"} col={primary_color} />
              </div>
              <div
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              >
                <RankCard width= {'95%'} title={"Bottom Three"} col={"red"} />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(teacherHomePage));
