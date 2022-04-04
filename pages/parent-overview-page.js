import React, { useEffect } from "react";
import { Col, Row, Divider, Button } from "antd";
import withAuth from "../utils/protectRoute";
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import ChildrenDataCard from "../Components/parentOverview/childrenDataCard";
import { connect } from "react-redux";
import { parentGetMeAction } from "../store/ParentGetMe/parentGetMeAction";
import Router from "next/router";
import {
  getNotificationForMe,
  getMyNotification,
  addNotification,
} from "../store/Notification/NotificationAction";

function ParentOverviewPage({
  parentGetMe,
  parentGetMeAction,
  getNotificationForMe,
  getMyNotification,
  notification,
  myNotification,
}) {
  var child = [];

  useEffect(() => {
    parentGetMeAction();
    getMyNotification();
    getNotificationForMe();
  }, []);
  if (parentGetMe.data) {
    for (let i = 0; i < parentGetMe.data.children.rows.length; i++) {
      var rank = parentGetMe.data.rank[i].rank;
      var average = parentGetMe.data.rank[i].average;
      child.push(
        <div
          onClick={() => {
            Router.push({
              pathname: "/SingleStudent",
              query: { studentid: parentGetMe.data.children.rows[i].uuid },
            });
          }}
        >
          <ChildrenDataCard
            key={parentGetMe.data.children.rows[i].uuid}
            name={
              `${parentGetMe.data.children.rows[i].firstName} ` +
              `${parentGetMe.data.children.rows[i].lastName}`
            }
            // image={parentGetMe.data.children.rows[i].src}
            rank={`Rank: ${rank}`}
            average={`${average} %`}
          />
        </div>
      );
    }
  }

  return (
    <div
      style={{
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Row justify="space-between">
        <Col xs={24} lg={12} xl={12}>
          <Divider style={{ marginTop: "0" }} orientation="left">
            My Children
          </Divider>

          {child}
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
              notifications={notification.notifications.map((notification) => {
                return {
                  name: notification.notificationInformation.ownerInformation
                    ? notification.notificationInformation.ownerInformation.name
                    : "",
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
    parentGetMe: state.parentGetMe.parent,
    myNotification: state.myNotification,
    notification: state.notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    parentGetMeAction: () => dispatch(parentGetMeAction()),
    getMyNotification: (value) => dispatch(getMyNotification(value)),
    getNotificationForMe: (value) => dispatch(getNotificationForMe(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(ParentOverviewPage));
