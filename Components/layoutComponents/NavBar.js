import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Row,
  Popconfirm,
  Popover,
} from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import useWindowSize from "../../utils/windowsSize";
import { connect } from "react-redux";
import {
  authSuccess,
  logout,
  loadingFalse,
  loadingTrue,
} from "../../store/index";
import Router, { useRouter } from "next/router";
import { primary_color } from "../../utils/constants";
function NavBar({
  menu,
  userData,
  authSuc,
  logout,
  loadingFalse,
  loadingTrue,
}) {
  const [visible, setVisible] = useState(false);
  const [Avatarimage, setAvatarimage] = useState("");

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
      url: localStorage.getItem("url"),
    };
    authSuc(token, data);
  }

  useEffect(() => {
    if (window.performance) {
      resetData();
    }
  }, []);
    useEffect(() => {
      if (userData.token) {
        if (userData.data.url) {
          setAvatarimage(userData.data.url);
        }
      }
    }, [userData.data.url]);
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
              Netib Systems
            </h3>
          </a>
        </Col>
        <Col>
          <Row align="middle">
            <div
              style={{
                width: "1px",
                backgroundColor: "grey",
                height: "40px",
                margin: "0px 10px",
              }}
            ></div>
            <span className="avatar-item">
              {userData.data.url ? (
                <Avatar
                  shape="circle"
                  size="large"
                  src={
                    "https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png"
                  }
                />
              ) : (
                <Avatar
                  shape="circle"
                  size="large"
                  src={"/sampleWoman.jpg"}
                  icon={<UserOutlined />}
                />
              )}
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
            <Popover
              placement="bottomRight"
              content={
                <div>
                  <Row
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Router.push("/profile");
                    }}
                  >
                    <UserOutlined
                      style={{ marginRight: "10px", marginTop: "4px" }}
                    />
                    <p>Profile</p>
                  </Row>
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
                    <Row style={{ cursor: "pointer" }}>
                      <LogoutOutlined
                        style={{ marginRight: "10px", marginTop: "4px" }}
                      />
                      <p>Logout</p>
                    </Row>
                  </Popconfirm>
                </div>
              }
              trigger="hover"
            >
              <DownOutlined style={{ marginLeft: "8px" }} />
            </Popover>
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
