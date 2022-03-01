import React from "react";
import { Menu } from "antd";

export default function TopicMenu({ items, selectedKey, changeSelectedKey }) {
  const styledTopics = [];
  items.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item
        style={{
          paddingLeft: "5px",
        }}
        key={index}
        l={topic.link}
        onClick={changeSelectedKey}
        icon={topic.icon}
      >
        {topic.name}{" "}
      </Menu.Item>
    )
  );

  return (
    <>
      <div
        style={{
          height: "50px",
          margin: "12px",
          background: "rgba(255, 255, 255, 0)",
          textAlign: "left",
        }}
      >
        <img src="/logo-with-text.png" alt="logo" height={40}/>
      </div>
      <br/>
      <Menu
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={["0"]}
        theme="dark"
        mode="inline"
      >
        {styledTopics}{" "}
      </Menu>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          margin: "12px",
          marginBottom: "-8px",
          marginLeft: "16px",
          color: "#fff",
          fontSize: "11px",
        }}
      >
        <pre>
          ©2022 Leanbits
          <pre>All Rights Reserved</pre>
        </pre>
      </div>
    </>
  );
}
