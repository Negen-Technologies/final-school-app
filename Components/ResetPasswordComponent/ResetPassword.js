import React, { useState,useEffect } from "react";
import { Form, Input, Button, Col, Row, Modal } from "antd";
import Image from "next/image";
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { resetPasswordAction } from '../../store/index'





function onFinishFailed() {
  console.log("on finish failed");
}


function ResetPassword({resetpassword,
  resetPasswordFunction}) {

    function success() {
      Modal.success({
        title: resetpassword.message ,
      });
    }
    if(resetpassword.message){
      success()
    }

  
  var token;

  const router = useRouter();
  const code = router.query;
  token=code.code




const onSubmit = (value) => {
    
    console.log(value)
    if (value.confirmPassword !== value.newPassword) {
      Modal.error({
        title: 'passwords did not match.' ,
      });
    } else {
      resetPasswordFunction( value.confirmPassword, token );
     
    }
  };

  return (
    <div>
      
      <Row justify="center" style={{ marginTop: "10%" }}>
        <Col
          style={{ textAlign: "center" }}
          span={12}
          xl={12}
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
        <Col span={12} xl={12} md={24} sm={24} xs={24}>
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
            <h1>Reset Password</h1>
            {/* <Divider orientation="left" /> */}

            <h4>Please enter your new password to reset it.</h4>
            <br />

            <Form
              // {...layout}
              className="login-form"
              size='large'
              name="rest password"
             
              // onFinish={onFinish}
              onFinish={(e) => onSubmit(e)}
              onFinishFailed={onFinishFailed}
            >
              
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
                {/* <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" /> */}
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                ]}
               
              >
                <Input.Password />

              </Form.Item>

              <div style={{color:'red'}}>{resetpassword.error}</div>
              <br/>
              <Form.Item /*{...tailLayout}*/>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginLeft: "10px" }}
                  loading={resetpassword.isPending}
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
    resetpassword: state.resetPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordFunction: (password, token) => dispatch(resetPasswordAction(password, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

