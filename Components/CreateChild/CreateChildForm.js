import React, { useState, useEffect } from "react";
import { Input, Form, Row, Button, Col, Select } from "antd";
import { connect } from "react-redux";

function CreateUserForm({ props, onError, createChild, userData, onFinish, setStateValue }) {
  const [fileList, setFileList] = useState([]);
  // const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm();
  var OptionsList = [];
  for (let index = 1; index < 13; index++) {
    OptionsList.push(<Select.Option key={index} value={index}>{index}</Select.Option>);
  }

  setStateValue = (value) => {
      return value
  }

  return (
    <div>
      {createChild.createdChild.status === 'Success' ? <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
                width: "100%",
              }}>
                      <h1>Both parent and student is created!</h1>
               </div> : <div style={{ textAlign: "center", marginTop: "5%" }}>
        <Form
          size="large"
          form={form}
          // labelCol={{ span: 4 }}
          onFinish={(values) => {
            onFinish(values);
            createChild.createdChild.status === 'Success' ? setStateValue(0) : null
          }}
          wrapperCol={{
            xs: { span: 20, offset: 1 },
            sm: { span: 20, offset: 3 },
            md: { span: 20, offset: 4 },
            lg: { span: 20, offset: 2 },
            xl: { span: 20, offset: 2 },
          }}
        >
          <Form.Item name="name">
            <Row>
              <Col span={12} xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>

              <Col span={12} xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: "Missing last name" }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{ required: true, message: "Missing Age" }]}
          >
            <Input placeholder="Age" />
          </Form.Item>
          <Form.Item
            name="grade"
            rules={[{ required: true, message: "Missing Grade" }]}
          >
            <Input placeholder="Grade" />
          </Form.Item>
          {/* <Form.Item
            name="file"
            rules={[{ required: true, message: "Missing Previous Record" }]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Upload certificate of the previous year
              </p>
            </Dragger>
          </Form.Item> */}

          {/* PDF UPLOAD FOR RECORD */}
          {/* PDF UPLOAD FOR RECORD */}
          {/* PDF UPLOAD FOR RECORD */}
          {/* PDF UPLOAD FOR RECORD */}
          {/* PDF UPLOAD FOR RECORD */}
          {/* PDF UPLOAD FOR RECORD */}

          <Form.Item
            name="sex"
            rules={[{ required: true, message: "Enter Gender" }]}
          >
            <Select
              labelInValue
              placeholder="Select Gender"
              style={{ width: "100%" }}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="grade"
            rules={[{ required: true, message: "Enter Gender" }]}
          >
            <Select
              labelInValue
              placeholder="Select Grade"
              style={{ width: "100%" }}
            >
              {OptionsList}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginLeft: 30 }}
              error={onError}
              loading={createChild.isPending}
            >
              Submit
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    createChild: state.createChild,
    createChildIsPending: state.createUser.isPending,
    createChildError: state.createUser.error,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);
