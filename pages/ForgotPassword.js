import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Form, Input, Button, Row, Divider, Col, Modal } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { forgotPassword } from "../store/index";
import withAuth from "../utils/protectRoute";


function ForgotPassword({ forgotData, forgotPassword }) {
  const onFinish = (value) => {
    forgotPassword(value);
  };

  function success() {
    Modal.success({
      title: forgotData.message + ". Please check your Email.",
    });
  }

  function error() {
    Modal.error({
      title: forgotData.error,
      okButtonProps: { style: { backgroundColor: "red", borderColor: "red" } },
    });
  }



  if (forgotData.message) {
    success();
  }

  if (forgotData.error) {
    error();
  }

  return (
    <div>
      <Row justify="center" style={{ marginTop: "10%" }}>
        <Col
          style={{ textAlign: "center" }}
          span={12}
          xl={6}
          md={0}
          sm={0}
          xs={0}
        >
          <Image
            src="/Images/forgotPassword.jpg"
            alt="me"
            width="500"
            height="500"
          />
        </Col>
        <Col span={12} xl={6} md={12} sm={12} xs={12}>
          <div
            style={{
              background: "white",

              color: "black",
              borderRadius: "12px",
              padding: "25px",
              boxShadow:
                "4px 4px 8px rgba(0, 0, 0, 0.2),-4px 1px 8px rgba(0, 0, 0, 0.2)",
              paddingBottom: "5px",
            }}
          >
            <h1>Forgot Password</h1>
            <Divider orientation="left" />

            <h4>Please enter your email to search for your account.</h4>
            <br />

            <Form
              name="normal_login"
              className="login-form"
              size="large"
              title="Forgot Password"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Divider orientation="left" />
              <Form.Item style={{ textAlign: "right" }}>
                <Link href="/Login">
                  <Button>Cancel</Button>
                </Link>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginLeft: "10px" }}
                  loading={forgotData.loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    forgotData: state.forgotpassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (value) => dispatch(forgotPassword(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(ForgotPassword));
