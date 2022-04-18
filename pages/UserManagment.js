import React, { useState, useEffect } from "react";
import AllUserTable from "../Components/UsermanagementComponents/AlluserTable";
import AdminTable from "../Components/UsermanagementComponents/AdminTable";
import ParentTable from "../Components/UsermanagementComponents/ParentTable";
import TeacherTable from "../Components/UsermanagementComponents/TeacherTable";

import {
  Button,
  Modal,
  Card,
  Col,
  Input,
  Row,
  Select,
  Steps,
  Result,
  Divider,
} from "antd";

import { PlusOutlined, PrinterOutlined } from "@ant-design/icons";
import withAuth from "../utils/protectRoute";

import { connect } from "react-redux";
import {
  getAllUserSuccess,
  getAllTeacherSuccess,
  getAllParentSuccess,
  getAllAdminSuccess,
  createTeacher,
} from "../store/index";
import { createUser } from "../store/CreateUser/CreateUserAction";
import CreateUserForm from "../Components/CreateUser/CreateUserForm";
import CreateChildForm from "../Components/CreateChild/CreateChildForm"; //HERE
import AssignTeacherToCourseForm from "../Components/CreateTeacher/AssignTeacherToCourseForm";
import { createChild } from "../store/CreateChild/CreateChildAction";
import { primary_color } from "../utils/constants";
const { Option } = Select;
const { Step } = Steps;

const UserManagementTable = (props) => {
  const [value, setValue] = useState("All Users");
  const [searchvalue, setsearchvalue] = useState("");
  const [visible, setVisible] = useState(false);
  const [Children, setChildren] = useState([]);
  const [stepPage, setStepPage] = useState(0);
  const [role, setrole] = useState("");
  const [isprinting, setisprinting] = useState(false);

  useEffect(() => {
    if (props.createTeacherData["uuid"] !== undefined) {
      setStepPage(stepPage + 1);
    }
  }, [props.createTeacherData]);

  useEffect(() => {
    if (props.createUserData.createdUser["user"] !== undefined) {
      if (role === "admin") {
        setStepPage(2);
      } else {
        setStepPage(1);
      }
    }
  }, [props.createUserData]);

  useEffect(() => {
    if (props.users.length === 0 && value === "All Users") {
      props.getAllUserSuccess(10, 1);
    }
  }, []);
  useEffect(() => {
    if (props.teachers.length === 0 && value === "Teacher") {
      props.getAllTeacherSuccess(10, 1);
    }
  }, [value]);

  useEffect(() => {
    if (props.admins.length === 0 && value === "Admin") {
      props.getAllAdminSuccess(10, 1);
    }
  }, [value]);
  useEffect(() => {
    if (props.parents.length === 0 && value === "Parents") {
      props.getAllParentSuccess(10, 1);
    }
  }, [value]);

  useEffect(() => {
    if (isprinting) {
      window.print();
      setisprinting(false);
    }
  }, [isprinting]);

  function handleChange(value) {
    setValue(value);
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    stepPage === 2 ? (setVisible(false), setStepPage(0)) : setVisible(false);
  };

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

  const ChildComponent = (user) => {
    return (
      <>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={user.user.firstName + " " + user.user.lastName}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Grade" content={user.user.grade} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Age" content={user.user.age} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Gender" content={user.user.sex} />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div>
        <h1 style={{ fontSize: 20, marginLeft: 20 }}>User Management</h1>
      </div>
      <div>
        <Card>
          <Row>
            <Col
              style={{ marginBottom: 5 }}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={8}
            >
              <Select
                defaultValue="All User"
                onChange={handleChange}
                style={{ width: 300 }}
                size="large"
              >
                <Select.Option value="All Users">All Users</Select.Option>
                <Select.Option value="Teacher">Teacher</Select.Option>

                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Parents">Parent</Select.Option>
              </Select>
            </Col>

            <Col
              style={{ marginBottom: 5 }}
              className="gutter-row"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={8}
            >
              <Button
                size="large"
                type="success"
                icon={<PlusOutlined />}
                style={{
                  textAlign: "center",
                  background: primary_color,
                  color: "white",
                }}
                onClick={() => {
                  showModal();
                }}
              >
                Create User
              </Button>
            </Col>
          </Row>
        </Card>
        <Modal
          title={!isprinting ? "Create a User" : ""}
          visible={visible}
          onCancel={handleCancel}
          style={{ top: 20 }}
          closable={!isprinting}
          bodyStyle={{ width: "100%" }}
          footer={null}
        >
          <div>
            <Steps
              style={isprinting ? { display: "none" } : {}}
              current={stepPage}
            >
              <Step title="Create User" />
              {role == "parent" ? (
                <Step title="Create Child" />
              ) : role == "teacher" ? (
                <Step title="Assign To Course" />
              ) : (
                <></>
              )}
              <Step title="Generated Password" />
            </Steps>
            <div></div>
            {Object.keys(props.createUserData.createdUser).length !== 0 &&
            stepPage === 2 ? (
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
                    {`Your password is: ${props.createUserData.createdUser.password}`}
                  </h1>
                  <p>{"Keep this password since you will need it to login"}</p>
                </div>
                <Divider orientation="left">User Information</Divider>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Full Name"
                      content={props.createUserData.createdUser.user.name}
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title="Email"
                      content={props.createUserData.createdUser.user.email}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Phone Number"
                      content={
                        "+251" +
                        props.createUserData.createdUser.user.phoneNumber
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title="User Type"
                      content={props.createUserData.createdUser.user.role}
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
              </>
            ) : stepPage === 1 ? (
              <div>
                {role == "parent" ? (
                  <CreateChildForm
                    createChild={props.createChild}
                    onError={props.createUserError}
                    onFinish={(checkedValues) => {
                      checkedValues["parentId"] =
                        props.createUserData.createdUser.user.uuid;
                      props.createChildFunction(checkedValues);
                    }}
                    onDone={(createdChildren) => {
                      setChildren(createdChildren);
                      setStepPage(2);
                    }}
                  />
                ) : (
                  <AssignTeacherToCourseForm
                    onSubmit={(val) => {
                      props.createTeacher(val);
                    }}
                    isLoading={props.createTeacherPending}
                  />
                )}
              </div>
            ) : (
              <CreateUserForm
                createUser={props.createUserData}
                onFinish={(checkedValues) => {
                  checkedValues.Phone = "+251" + checkedValues.phoneNo;
                  if (
                    checkedValues.confirmPassword !== checkedValues.password
                  ) {
                    Modal.error({
                      title: "passwords did not match.",
                    });
                  } else {
                    props.createUserFunction(checkedValues);
                  }
                }}
                onRoleChange={(r) => {
                  setrole(r);
                }}
              />
            )}
          </div>
        </Modal>
      </div>
      {value === "All Users" ? (
        <AllUserTable searchvalue={searchvalue} />
      ) : value === "Teacher" ? (
        <TeacherTable searchvalue={searchvalue} />
      ) : value === "Admin" ? (
        <AdminTable searchvalue={searchvalue} />
      ) : (
        <ParentTable searchvalue={searchvalue} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.allusers.allusers,
    usersPending: state.allusers.loading,
    usersError: state.allusers.error,
    admins: state.admins.admins,
    adminsPending: state.admins.loading,
    adminsError: state.admins.error,
    teachers: state.teachers.teachers,
    teachersPending: state.teachers.loading,
    teachersError: state.teachers.error,
    parents: state.parents.parents,
    parentsPending: state.parents.loading,
    parentsError: state.parents.error,

    createUserData: state.createUser,
    createUserPending: state.createUser.isPending,
    createUserError: state.createUser.error,
    createChild: state.createChild,
    createChildIsPending: state.createUser.isPending,
    createChildError: state.createUser.error,
    createTeacherData: state.createTeacher.createdTeacher,
    createTeacherPending: state.createTeacher.isPending,
    createTeacherError: state.createTeacher.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserSuccess: (limit, page) =>
      dispatch(getAllUserSuccess(limit, page)),
    getAllTeacherSuccess: () => dispatch(getAllTeacherSuccess()),
    getAllParentSuccess: () => dispatch(getAllParentSuccess()),
    getAllAdminSuccess: () => dispatch(getAllAdminSuccess()),
    createTeacher: (courseId) => dispatch(createTeacher(courseId)),
    createUserFunction: (userData) => dispatch(createUser(userData)),
    createChildFunction: (value) => dispatch(createChild(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UserManagementTable));
