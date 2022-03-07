import { Button, Col, Divider, Pagination, Row, Space, Tag } from "antd";
import React from "react";
import NotificationCardWithContent from "../NotificationComponents/NotificationCardWithContent";

export default function notificationsList({
  notifications,
  title = "Notifications",
}) {
  const [page, setPage] = React.useState(1);
  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return (
        <Button
          style={page != 1 ? { color: "white" } : { color: "black" }}
          type="primary"
        >
          Previous
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button
          style={
            2 * page < notifications.length
              ? { color: "white" }
              : { color: "black" }
          }
          type="primary"
        >
          Next
        </Button>
      );
    }
    return originalElement;
  }
  return (
    <div>
      <Divider style={{ marginTop: "0" }} orientation="left">
        {title}
      </Divider>
      <div>
        <NotificationCardWithContent
          notification={notifications[2 * page - 2]}
        ></NotificationCardWithContent>
      </div>
      {2 * page < notifications.length ? (
        <div>
          <NotificationCardWithContent
            notification={notifications[2 * page - 1]}
          ></NotificationCardWithContent>
        </div>
      ) : (
        ""
      )}
      <Row justify="center">
        <Pagination
          defaultCurrent={1}
          pageSize={2}
          total={notifications.length}
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onChange={(page, pageSize) => {
            setPage(page);
          }}
          showSizeChanger={false}
          itemRender={itemRender}
        />
      </Row>
    </div>
  );
}
