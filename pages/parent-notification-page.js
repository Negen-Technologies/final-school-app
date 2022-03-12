import React, { useEffect, useState } from "react";
import withAuth from "../utils/protectRoute";
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import { Button, Select } from "antd";
import router from "next/router";
import { getNotificationForMe } from "../store/Notification/NotificationAction";
import { connect } from "react-redux";
import { parentGetMeAction } from "../store/ParentGetMe/parentGetMeAction";

function ParentNotificationPage({
  notification,
  getNotificationForMe,
  parentGetMe,
  parentGetMeAction,
}) {
  const [filteredNotification, setFilteredNotification] = useState([]);
  var selectedChildId = "";
  const [selectedChild, setSelectedChild] = useState("All");
  var childIds = [];
  var forFilteredNotification = [];

  useEffect(() => {
    getNotificationForMe();
    parentGetMeAction();
  }, []);

  useEffect(() => {
    setNotificationList();
  }, [notification]);

  if (parentGetMe.data) {
    childIds.push({ id: "idx", name: "All" });
    parentGetMe.data.children.rows.forEach((child) => {
      childIds.push({
        id: child.uuid,
        name: child.firstName + " " + child.lastName,
      });
    });
  }

  function setNotificationList() {
    if (notification.notifications.length > 0) {
      if (selectedChildId !== "" && selectedChildId !== "idx") {
        notification.notifications.forEach((note) => {
          note.studentId === selectedChildId
            ? forFilteredNotification.push(note)
            : null;
        });
      } else if (selectedChildId === "idx") {
        notification.notifications.forEach((note) => {
          forFilteredNotification.push(note);
        });
      } else {
        notification.notifications.forEach((note) => {
          forFilteredNotification.push(note);
        });
      }
    }
    setFilteredNotification(forFilteredNotification);
  }

  return (
    <div
      style={{
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Select
        style={{ width: "100%", marginBottom: "2px" }}
        value={selectedChild}
        onChange={(value) => {
          selectedChildId = value;
          // setSelectedChildId(value);
          childIds.forEach((child) => {
            child.id === value
              ? setSelectedChild(child.name)
              : child.id === "idx"
              ? setSelectedChild("All")
              : null;
          });

          setNotificationList();
        }}
        placeholder="Select Child"
      >
        {childIds.map((cl) => (
          <Select.Option value={cl.id} key={cl.name}>
            {cl.name}
          </Select.Option>
        ))}
      </Select>

      {filteredNotification.length > 0 ? (
        <NotificationsPagination
          notifications={filteredNotification.map((notification) => {
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
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    parentGetMe: state.parentGetMe.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationForMe: (value) => dispatch(getNotificationForMe(value)),
    parentGetMeAction: () => dispatch(parentGetMeAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(ParentNotificationPage));
