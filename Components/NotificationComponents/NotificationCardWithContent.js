import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";

export default function  NotificationCardWithContent({ notification }) {
  const not = notification;
  console.log(not)
  return (
    <div>
      <Card
        style={{
          backgroundColor: "fffff",
          // border: "1px solid grey",
          minWidth: "300px",
          marginBottom: "10px",
        }}
      >
        <Avatar
          style={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
          }}
          // src={not.src}
        ></Avatar>
        <div
          style={{
            display: "inline-block",
          }}
        >
          <h1 style={{ margin: "0" }}>{not.name}</h1>
        </div>
        <div
          style={{
            margin: "0px",
            marginLeft: "60px",
          }}
        >
          <p>{not.content}</p>
        </div>
      </Card>
    </div>
  );
}
