import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Row,
  Tooltip,
  Popconfirm,
} from "antd";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import useWindowSize from "../../utils/windowsSize";
import { connect } from "react-redux";
import {
  authSuccess,
  logout,
  loadingFalse,
  loadingTrue,
} from "../../store/index";
import Router, { useRouter } from "next/router";
import { primary_color } from "../../public/constants";
function NavBar({
  menu,
  userData,
  authSuc,
  logout,
  loadingFalse,
  loadingTrue,
}) {
  const [visible, setVisible] = useState(false);
  const { width } = useWindowSize();
  var router = useRouter();

  function resetData() {
    var token = localStorage.getItem("token");
    var data = {};

    data = {
      uuid: localStorage.getItem("uuid"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phoneNumber: localStorage.getItem("phoneNumber"),
      role: localStorage.getItem("role"),
    };
    authSuc(token, data);
  }

  useEffect(() => {
    if (window.performance) {
      resetData();
    }
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "white",
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Row style={{ paddingRight: "20px" }} justify="space-between">
        <Col>
          <Button
            style={width > 992 ? { display: "none" } : {}}
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
          <Drawer
            bodyStyle={{
              backgroundColor: primary_color,
              padding: "0",
            }}
            headerStyle={{
              paddingLeft: "2rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            closable={false}
            placement="left"
            onClick={() => setVisible(false)}
            onClose={() => setVisible(false)}
            visible={visible}
          >
            {menu}
          </Drawer>
          <a href="/">
            {/* <img style={{ height: "42px", padding:"0" }} src="/school-logo.png" alt="logo" /> */}
            <h3
              style={{
                marginTop: "10px",
                color: primary_color,
                fontWeight: 400,
                fontSize: 18,
              }}
            >
              School Name
            </h3>
          </a>
        </Col>
        <Col>
          <Row
            align="middle"
          >
            <div
              style={{
                width: "1px",
                backgroundColor: "grey",
                height: "40px",
                margin: "0px 10px",
              }}
            ></div>
            <span className="avatar-item">
              <Badge count={1}>
                <Avatar
                  onClick={() => {
                    Router.push("/profile");
                  }}
                  shape="circle"
                  size="large"
                  src="/sampleWoman.jpg"
                  icon={<UserOutlined />}
                />
              </Badge>
            </span>
            <h1
              style={{
                paddingLeft: "10px",
                paddingTop: "5px",
                paddingRight: "5px",
              }}
            >
              Hi, {userData.data.name}
            </h1>
            <Popconfirm
              title="Are you sure you want to log out?"
              onConfirm={() => {
                loadingTrue();
                router.replace("/Login").then(() => {
                  logout();
                  loadingFalse();
                });
              }}
              okText="Logout"
              cancelText="Cancel"
            >
              <Tooltip title="Logout">
                <Button icon={<LogoutOutlined />}></Button>
              </Tooltip>
            </Popconfirm>
          </Row>
        </Col>
      </Row>
    </nav>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authSuc: (token, data) => dispatch(authSuccess(token, data)),
    logout: () => dispatch(logout()),
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
