import React, { useState, useEffect } from "react";
import { Input, Form, Row, Button, Col,Steps, Select, Result, Divider, List, Avatar } from "antd";
import { connect } from "react-redux";
import {
  getSingleStudentInfo,
  updateSingleStudentInfo,
} from "../../store/singleStudentInfo/singleStudentInfoAction";
import CreateUserForm from "../CreateUser/CreateUserForm";
import { PrinterOutlined } from "@ant-design/icons";
import create from "@ant-design/icons/lib/components/IconFont";

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
  const { Step } = Steps;
  const [form] = Form.useForm();
  var OptionsList = [];
  const [defaultGender, setDefaultGender] = useState({});
  const [formChange, setFormChange] = useState(false);
  const [stepPage, setStepPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isprinting, setisprinting] = useState(false);
  const [role, setrole] = useState("");



  var defGender = {};
  // for (let index = 1; index < 13; index++) {
  //   OptionsList.push(
  //     <Select.Option key={index} value={index}>
  //       {index}
  //     </Select.Option>
  //   );
  // }

  const genderOption = [
    { key: "Male101", value: "Male", label: "Male" },
    { key: "Female101", value: "Female", label: "Female" },
  ];

  useEffect(() => {
    if (createUser.createdUser["user"] !== undefined) {
        setStepPage(1);
    }
  }, [createUser]);

  useEffect(() => {
    if (isprinting) {
      window.print();
      setisprinting(false);
    }
  }, [isprinting]);

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

  const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        marginBottom: "7px",
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "14px",
        lineHeight: 1.5715,
      }}
    >
      <p
        style={{
          display: "inline-block",
          marginRight: "8px",
          color: "rgba(0, 0, 0, 0.85)",
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );

  return (
    <div>
      {formChange ? (
        <div>
            <Steps
              current={stepPage}
            >
              <Step title="Create User" />
              <Step title="Generated Password" />
            </Steps>
          {stepPage == 0 ? 
          <CreateUserForm 
          isFromEditChild={true} 
          isForChangeParent={true}
          onRoleChange={(r) => {
            setrole(r);
          }}
           /> : 
          <>
                {isprinting ? (
                  <></>
                ) : (
                  <Result
                    status="success"
                    title="Successfully Created a User"
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    width: "100%",
                  }}
                >
                  <Button
                    style={
                      isprinting ? { display: "none" } : { marginBottom: 20 }
                    }
                    onClick={() => {
                      setisprinting(true);
                    }}
                    icon={<PrinterOutlined />}
                    type="primary"
                  >
                    Print
                  </Button>

                  <h1 style={{ paddingBottom: 4 }}>
                    {`Your password is: ${createUser.createdUser.password}`}
                  </h1>
                  <p>{"Keep this password since you will need it to login"}</p>
                </div>
                <Divider orientation="left">User Information</Divider>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Full Name"
                      content={createUser.createdUser.user.name}
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title="Email"
                      content={createUser.createdUser.user.email}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Phone Number"
                      content={
                        "+251" +
                        createUser.createdUser.user.phoneNumber
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title="User Type"
                      content={createUser.createdUser.user.role}
                    />
                  </Col>
                </Row>
                {role === "parent" ? (
                  <>
                    <Divider orientation="left">Children Information</Divider>
                    {Children.map((child, i) => {
                      return (
                        <>
                          <ChildComponent key={i} user={child} />
                          <Divider />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
                {isprinting ? (
                  <></>
                ) : (
                  <Button
                    onClick={() => {
                      setVisible(false);
                      setStepPage(0);
                    }}
                    type="primary"
                    key="console"
                  >
                    Finish
                  </Button>
                )}
              </>}
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
