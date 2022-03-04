import React, { useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../store";
import { Row, Col } from "antd";
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

import { primary_color } from "../public/constants";


function HomePage({
  getAttendanceStat,
  notification,
  myNotification,
  getAllStudents,
  getNotificationForMe,
  getMyNotification,
  loadingTrue,
  loadingFalse,
}) {
  var router = useRouter();
  useEffect(() => {
    getMyNotification();
    getNotificationForMe();
    getAttendanceStat();
    getAllStudents();

    loadingFalse();
  }, []);

  console.log("NOtification", notification);
  return (
    <div>
      <Col span={24}>
        <Row>
          <Col xs={24} lg={12} xl={12}>
            <Row>
              <Col xs={18} lg={12} xl={12}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: primary_color,
                    marginTop: "20px",
                    marginBottom: "20px",
                    paddingRight: "120px",
                  }}
                >
                  Top Scores
                </h1>
                <RankCard width= {'95%'} title={"Top Three"} col={primary_color} />
              </Col>
              <Col xs={18} lg={12} xl={12}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: primary_color,
                    marginTop: "20px",
                    marginBottom: "20px",
                    paddingRight: "120px",
                  }}
                >
                  Low Scores
                </h1>
                <RankCard width= {'95%'} title={"Bottom Three"} col={"red"} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={12} xl={12}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
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
                  <SliderChart />
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
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: primary_color,
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    Students Attendance Data
                  </h1>
                  <BarChart />
                </div>
              </Col>
            </Row>
          </Col>

          <Col
            style={{
              height: "90vh",
              overflowY: "scroll"
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(HomePage));
