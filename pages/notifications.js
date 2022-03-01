import React from "react";
import { Button, Col, Input, Row, Select } from "antd";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import withAuth from "../utils/protectRoute";
import { useState, useEffect } from "react";
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import TextArea from "antd/lib/input/TextArea";
import {
  getNotificationForMe,
  getMyNotification,
  addNotification,
} from "../store/Notification/NotificationAction";

function Notifications({
  loadingTrue,
  loadingFalse,
  notification,
  myNotification,
  addNotificationR,
  getNotificationForMe,
  getMyNotification,
  addNotification,
}) {
  useEffect(() => {
    getNotificationForMe();
    getMyNotification();
  }, []);
  const en = ["all", "grade", "class", "student", "user"];
  const [notFor, setNotFor] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [userId, setUserId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");

  const onFinish = () => {
    console.log(notFor, text, title, grade, userId, studentId, classId);
    if (notFor === "user") {
      if (userId === "" || text === "" || title === "") {
        alert("Please fill all the fields");
      } else {
        addNotification({
          notFor: notFor,
          text: text,
          title: title,
          userId: userId,
        });
      }
    } else if (notFor === "student") {
      if (studentId === "" || text === "" || title === "") {
        alert("Please fill all the fields");
      } else {
        addNotification({
          notFor: notFor,
          text: text,
          title: title,
          studentId: studentId,
        });
      }
    } else if (notFor === "class") {
      if (classId === "" || text === "" || title === "") {
        alert("Please fill all the fields");
      } else {
        addNotification({
          notFor: notFor,
          text: text,
          title: title,
          classId: classId,
        });
      }
    } else if (notFor === "grade") {
      if (grade === "" || text === "" || title === "") {
        alert("Please fill all the fields");
      } else {
        addNotification({
          notFor: notFor,
          text: text,
          title: title,
          grade: grade,
        });
      }
    } else {
      if (text === "" || title === "") {
        alert("Please fill all the fields");
      } else {
        addNotification({
          notFor: notFor,
          text: text,
          title: title,
        });
      }
    }
  };
  return (
    <div>
      <Row style={{ padding: "25px" }} justify="space-between">
        <Col xs={24} lg={12} xl={11}>
          <div>
            <h1>Create a Notification</h1>
            <div
              style={{
                backgroundColor: "white",
                border: "grey 1px solid",
                borderRadius: "5px",
                padding: "20px",
              }}
            >
              <Row style={{ padding: "0 20px 0 20px" }} justify="space-between">
                <Col xs={24} lg={12} xl={11}>
                  <h3 style={{ marginLeft: "5px" }}>Notification for</h3>

                  <Select
                    labelInValue
                    placeholder="This Notification is for"
                    style={{ width: "100%" }}
                    onChange={(value) => setNotFor(value.value)}
                  >
                    {
                      //options for notification
                      en.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </Select.Option>
                        );
                      })
                    }
                  </Select>
                </Col>
                {notFor === en[0] ? (
                  ""
                ) : notFor === en[1] ? (
                  <Col xs={24} lg={12} xl={11}>
                    <h3 style={{ marginLeft: "5px" }}>Grade</h3>
                    <Input
                      onChange={(val) => setGrade(val.target.value)}
                      placeholder="Please enter the grade"
                      type={"number"}
                    ></Input>
                  </Col>
                ) : notFor === en[2] ? (
                  <Col xs={24} lg={12} xl={11}>
                    <h3 style={{ marginLeft: "5px" }}>Class</h3>
                    <Input
                      onChange={(val) => setClassId(val.target.value)}
                      placeholder="Please select the class"
                    ></Input>
                  </Col>
                ) : notFor === en[3] ? (
                  <Col xs={24} lg={12} xl={11}>
                    <h3 style={{ marginLeft: "5px" }}>Student</h3>
                    <Input
                      onChange={(val) => setStudentId(val.target.value)}
                      placeholder="Please enter students Id"
                    ></Input>
                  </Col>
                ) : (
                  <Col xs={24} lg={12} xl={11}>
                    <h3 style={{ marginLeft: "5px" }}>User</h3>
                    <Input
                      onChange={(val) => setUserId(val.target.value)}
                      placeholder="Please enter user Id"
                    ></Input>
                  </Col>
                )}
              </Row>
              <div style={{ padding: "0 20px 0 20px" }}>
                <h3 style={{ marginLeft: "5px" }}>Notification Title</h3>
                <Input
                  onChange={(val) => setTitle(val.target.value)}
                  placeholder="Add your title here"
                ></Input>
                <h3 style={{ marginLeft: "5px" }}>Notification Content</h3>
                <TextArea
                  onChange={(val) => setText(val.target.value)}
                  placeholder="Notification Content"
                  rows={10}
                ></TextArea>
              </div>
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                {addNotificationR.error}
              </div>
              <div
                style={{
                  color: "green",
                  textAlign: "center",
                }}
              >
                {addNotificationR.success}
              </div>
            </div>

            <Row style={{ marginTop: "15px" }}>
              <Button
                type="primary"
                style={{
                  margin: "auto auto",
                  color: "white",
                }}
                onClick={onFinish}
                loading={addNotificationR.loading}
              >
                Submit
              </Button>
            </Row>
          </div>
        </Col>
        <Col xs={24} lg={12} xl={12}>
          {notification.notifications.length > 0 ? (
            <NotificationsPagination
              notifications={notification.notifications.map((notification) => {
                return {
                  name: notification.notificationInformation.ownerInformation
                    .name,
                  src: "",
                  content: notification.notificationInformation.text,
                };
              })}
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
  );
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    myNotification: state.myNotification,
    addNotificationR: state.addNotification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationForMe: (value) => dispatch(getNotificationForMe(value)),
    getMyNotification: (value) => dispatch(getMyNotification(value)),
    addNotification: (value) => dispatch(addNotification(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Notifications));
