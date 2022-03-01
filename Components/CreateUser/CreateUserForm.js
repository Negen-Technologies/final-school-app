import React, { useState, useEffect } from "react";
import {
  Avatar,
  Input,
  Form,
  Space,
  Row,
  Button,
  Col,
  Upload,
  Select,
} from "antd";
import { EditOutlined,ArrowRightOutlined} from "@ant-design/icons";
import { connect } from "react-redux";
import storage from "../../utils/firebaseUpload";

const validatePhoneNo = (_, value) => {
  var phoneno = /^\d{9}$/;

  if (value.match(phoneno)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Please input a valid phone number!"));
  }
};

function CreateUserForm({ createUser, onFinish, onCancel, onRoleChange }) {
  const [form] = Form.useForm();
  const [role, setRole] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    onRoleChange(role);
  }, [role]);

  const handleOnChange = (event) => {
    setRole(event.value);
  };

  const buttonFunc = () => {
    if (role === "parent" || role === "teacher") {
      return "Proceed";
    } else {
      return "Submit";
    }
  };

  const uploadImg = async (image) => {
    if (image == null) return;
    setImageUrl("Getting Download Link...");
    // Sending File to Firebase Storage
    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .then(() => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImageUrl(url);
          });
      });
  };


  const props = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: async (file) => {
      setFileList([]);
      const newFileList = [file];

      setFileList(newFileList);
      setImageFile(URL.createObjectURL(file));
      uploadImg(file);
    },
    fileList,
  };

  return (
    <div>
      <div
        style={{ textAlign: "center", marginTop: "5%", marginRight: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "5%",
            marginTop: "5%",
          }}
        >
          <Upload {...props} showUploadList={false} accept=".jpg, .jpeg, .png">
            <Space align="end">
              <Avatar
                offset={5}
                size={{ xs: 80, sm: 80, md: 100, lg: 140, xl: 140, xxl: 140 }}
                src={imageFile}
              >
                Name
              </Avatar>
              <EditOutlined />
            </Space>
          </Upload>
        </div>
        <Form
          size="large"
          form={form}
          labelCol={{ span: 4 }}
          onFinish={(values) => {
            values.url = imageUrl;
            onFinish(values);
          }}
          wrapperCol={{
            xs: { span: 16, offset: 1 },
            sm: { span: 16, offset: 3 },
            md: { span: 16, offset: 4 },
            lg: { span: 16, offset: 6 },
            xl: { span: 16, offset: 6 },
          }}
        >
          <Form.Item>
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>

              <Col span={24} xs={24} sm={24} md={24} lg={24}>
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
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNo"
            rules={[
              { required: true, message: "Missing Phone Number" },
              { validator: validatePhoneNo },
            ]}
          >
            <Input placeholder="912345678" addonBefore="+251" />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Missing Type of The User" }]}
          >
            <Select
              labelInValue
              placeholder="Select User Type"
              style={{ width: "100%" }}
              onChange={handleOnChange}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="parent">Parent</Select.Option>
            </Select>
          </Form.Item>
          {createUser.error.data ? (
            <div>
              {createUser.error.data.status === "error" ? (
                <div>
                  <p style={{ color: "red" }}>
                    {createUser.error.data.message}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={createUser.isPending}
              icon={
                role === "parent" || role === "teacher" ? (
                  <ArrowRightOutlined />
                ) : null
              }
            >
              {buttonFunc()}
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    createUser: state.createUser,
    createUserPending: state.createUser.isPending,
    createUserError: state.createUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);
