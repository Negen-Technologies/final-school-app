import { Button, Col, Divider, Input, Row } from "antd";
import React, { useState } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { authLogin } from "../store/index";
import { primary_color } from "../utils/constants";
export function testLogin({ userData, authLogin }) {
  if (userData.token) {
    if (userData.data.role == "admin") {
      Router.push("/HomePage");
    } else if (userData.data.role == "teacher") {
      Router.push("/HomePage");
    } else if (userData.data.role == "parent") {
      Router.push("/parent-overview-page");
    }
  }
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = () => {
    var pn = "";
    if (phoneNumber.length == 10 && phoneNumber[0] == "0") {
      pn = phoneNumber.slice(1, 10);
      pn = `+251${pn}`;
    } else if (phoneNumber.slice(0, 3) == "251") {
      pn = `+${phoneNumber}`;
    } else if (phoneNumber[0] != "+") {
      pn = `+251${phoneNumber}`;
    } else {
      pn = phoneNumber;
    }

    authLogin({
      phoneNumber: pn,
      password: password,
    });
  };
  return (
    <div style={{ backgroundColor: "#F7F8F8" }}>
      <Row
        style={{
          height: "50px",
          backgroundColor: primary_color,
          margin: "auto auto",
        }}
        justify="center"
      >
        <h1 style={{ color: "white", fontWeight: "bolder" }}>School Name</h1>
      </Row>
      <Row style={{ width: "100vw", height: "90vh" }}>
        <div style={{ margin: "auto auto" }}>
          <h1
            style={{
              color: primary_color,
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            WELCOME
          </h1>
          <Row
            style={{
              height: "300px",
              width: "100vw",
            }}
            justify="center"
          >
            <Col
              style={{
                backgroundColor: "white",
                border: "2px solid #DDDDDD",
                borderRadius: "5px",
                padding: "30px",
                minWidth: "320px",
              }}
              span="7"
            >
              <Row justify="center">
                <h1
                  style={{
                    textAlign: "center",
                    marginBottom: "0px",
                  }}
                >
                  Login
                </h1>
              </Row>
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                {userData.error}
              </div>
              <Divider
                style={{ color: "#CCCCCC", borderColor: "#CCCCCC" }}
              ></Divider>
              <p style={{ margin: "0", color: "gray" }}>Phone Number</p>
              <Input
                onChange={(val) => setPhoneNumber(val.target.value)}
                placeholder="Phone Number"
              />
              <p style={{ margin: "5px 0 0 0", color: "gray" }}>Password</p>
              <Input
                onChange={(val) => setPassword(val.target.value)}
                placeholder="Password"
                type="password"
              />
              <Row style={{ marginTop: "15px" }}>
                <Button
                  style={{
                    margin: "auto auto",
                    color: "white",
                    backgroundColor: primary_color,
                    borderRadius: "0px",
                  }}
                  onClick={onFinish}
                  loading={userData.loading}
                  type="text"
                >
                  Log in
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (value) => dispatch(authLogin(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(testLogin);
