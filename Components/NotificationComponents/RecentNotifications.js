import { Card, Col, Divider, Row } from "antd";
import React from "react";
// import NotificationCard from "../NotificationComponents/NotificationCard";
import NotificationPagination from "../NotificationComponents/NotificationsPagination";

export default function RecentNotifications({ notifications }) {
  return (
    <div>
      <Card width="100%" style={{ backgroundColor: "transparent" }}>
        <Divider style={{ marginTop: 0 }} orientation="center">
          Recent Notifications
        </Divider>
        {notifications.map((notification, i) => {
          return (
            <Col key={i} xs={24}>
              <NotificationPagination
                title={notification.title}
                subject={notification.subject}
              ></NotificationPagination>
            </Col>
          );
        })}
      </Card>
    </div>
  );
}
