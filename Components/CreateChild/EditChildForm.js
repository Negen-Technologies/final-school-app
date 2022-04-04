import React, { useState, useEffect } from "react";
import { Input, Form, Row, Button, Col, Select, List, Avatar } from "antd";
import { connect } from "react-redux";
import {
  getSingleStudentInfo,
  updateSingleStudentInfo,
} from "../../store/singleStudentInfo/singleStudentInfoAction";
import CreateUserForm from "../CreateUser/CreateUserForm";
function EditChildForm({
  getSingleStudentInfo,
  updateSingleStudentInfo,
  singleStudentInfo,
  studentId,
  error,
  loading,
  createUser,
  createUserPending,
  createUserError,
}) {
  const [form] = Form.useForm();
  var OptionsList = [];
  const [defaultGender, setDefaultGender] = useState({});
  const [formChange, setFormChange] = useState(false);

  var defGender = {};
  for (let index = 1; index < 13; index++) {
    OptionsList.push(
      <Select.Option key={index} value={index}>
        {index}
      </Select.Option>
    );
  }

  const genderOption = [
    { key: "Male", value: "Male", label: "Male" },
    { key: "Female", value: "Female", label: "Female" },
  ];

  useEffect(() => {
    getSingleStudentInfo(studentId);
  }, []);
  useEffect(() => {
    if (singleStudentInfo) {
      var gender = genderOption.filter(
        (gender) => gender.value === singleStudentInfo.sex
      );

      defGender = gender;
      form.setFieldsValue({
        firstName: singleStudentInfo.firstName,
        lastName: singleStudentInfo.lastName,
        age: singleStudentInfo.age,
        sex: singleStudentInfo.sex,
      });
    }
  }, [singleStudentInfo]);

  useEffect(() => {
    createUser.createdUser.hasOwnProperty("password")
      ? updateSingleStudentInfo(studentId, createUser.createdUser.user.uuid)
      : null;
  }, [createUser]);

  useEffect(() => {
    setFormChange(false);
  }, [singleStudentInfo]);

  return (
    <div>
      {formChange ? (
        <div>
          <CreateUserForm isFromEditChild={true} />
        </div>
      ) : (
        <div style={{ marginTop: "5%" }}>
          <Form
            size="large"
            form={form}
            // labelCol={{ span: 4 }}
            onFinish={(values) => {
              updateSingleStudentInfo(
                studentId,
                singleStudentInfo.parentId,
                values
              );
              // window.location.reload(false)
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
              type="number"
              rules={[{ required: true, message: "Missing Age" }]}
            >
              <Input placeholder="Age" />
            </Form.Item>

            <Form.Item
              name="sex"
              initialValue={singleStudentInfo ? singleStudentInfo.sex : ""}
              rules={[{ required: true, message: "Enter Gender" }]}
            >
              <Select
                // labelInValue
                // defaultValue={singleStudentInfo ? singleStudentInfo.sex : ""}
                placeholder="Select Gender"
                options={genderOption}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginLeft: 30 }}
                  error={error}
                  loading={loading}
                >
                  Edit
                </Button>
                <Button
                  type="default"
                  className="login-form-button"
                  onClick={() => {
                    setFormChange(true);
                  }}
                  style={{ marginLeft: 30 }}
                >
                  Change Parent
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    singleStudentInfo: state.singleStudentInfo.info,
    error: state.singleStudentInfo.error,
    loading: state.singleStudentInfo.loading,

    createUser: state.createUser,
    createUserPending: state.createUser.isPending,
    createUserError: state.createUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleStudentInfo: (id) => dispatch(getSingleStudentInfo(id)),
    updateSingleStudentInfo: (id, parentId, data) =>
      dispatch(updateSingleStudentInfo(id, parentId, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditChildForm);
