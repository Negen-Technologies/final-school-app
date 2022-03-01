import React, { useState, useEffect } from "react";
import AllUserTable from "../Components/UsermanagementComponents/AlluserTable";
import AdminTable from "../Components/UsermanagementComponents/AdminTable";
import ParentTable from "../Components/UsermanagementComponents/ParentTable";
import TeacherTable from "../Components/UsermanagementComponents/TeacherTable";

import { Button, Modal, Card, Col, Input, Row, Select, Steps } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import withAuth from "../utils/protectRoute";

import { connect } from "react-redux";
import {
  getAllUserSuccess,
  getAllTeacherSuccess,
  getAllParentSuccess,
  getAllAdminSuccess,
} from "../store/index";
import { createUser } from "../store/CreateUser/CreateUserAction";
import CreateUserForm from "../Components/CreateUser/CreateUserForm";
import CreateChildForm from "../Components/CreateChild/CreateChildForm"; //HERE
import AssignTeacherToCourseForm from "../Components/CreateTeacher/AssignTeacherTOCourseForm";
import { createChild } from "../store/CreateChild/CreateChildAction";
import { primary_color } from "../public/constants";
const { Option } = Select;
const { Step } = Steps;

const UserManagementTable = (props) => {
  const [value, setValue] = useState("All Users");
  const [searchvalue, setsearchvalue] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [stepPage, setStepPage] = useState(0);
  const [role, setrole] = useState("");

  useEffect(() => {
    console.log(props.createUserData.createdUser);
    if (props.createUserData.hasOwnProperty("phoneNumber")) {
      setStepPage(stepPage + 1);
    }
  }, [props.createUserData]);
  

  useEffect(() => {
    if (props.users.length === 0 && value === "All Users") {
      console.log("user length");
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

  function handleChange(value) {
    console.log(`selected ${value}`);
    setValue(value);
  }

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
      setStepPage(0);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const stepPageChange = () => {
    setStepPage(2);
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
              md={24}
              lg={8}
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
              lg={8}
              xl={8}
            >
              <Input
                style={{ width: 300 }}
                size="large"
                placeholder="Search Here"
                onChange={(e) => {
                  console.log(e.target.value);
                  setsearchvalue(e.target.value);
                }}
              />
            </Col>
            <Col
              style={{ marginBottom: 5 }}
              className="gutter-row"
              xs={24}
              sm={24}
              md={12}
              lg={8}
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
          title="Create a User"
          visible={visible}
          onCancel={handleCancel}
          // width={"80vw"}
          bodyStyle={{ width: "100%" }}
          footer={null}
        >
          <div>
            <Steps current={stepPage}>
              <Step title="Create User" />
              <Step title="Generated Password" />
              {role == "parent" ? (
                <Step title="Create Child" />
              ) : role == "teacher" ? (
                <Step title="Assign To Course" />
              ) : (
                <></>
              )}
            </Steps>
            {/* <CreateUserPage /> */}
            {Object.keys(props.createUserData.createdUser).length !== 0 &&
            stepPage === 1 ? (
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
                <h1 style={{ paddingBottom: 4 }}>
                  {`Your password is: ${props.createUserData.createdUser.password}`}
                </h1>
                <p style={{ paddingBottom: 20 }}>
                  {"Keep this password since you will need it to login"}
                </p>
                <div>
                  <Button
                    type="primary"
                    key="ok"
                    style={{
                      width: 200,
                      marginLeft: "10px",
                    }}
                    onClick={
                      props.createUserData.createdUser.user.role === "parent"
                        ? stepPageChange
                        : handleOk
                    }
                    //   error={error}
                  >
                    {props.createUserData.createdUser.user.role === "parent" ? (
                      <p>Create Child</p>
                    ) : (
                      <p>Done</p>
                    )}
                  </Button>
                </div>
              </div>
            ) : stepPage === 2 ? (
              <div>
                {role == "parent" ? (
                  <CreateChildForm
                    createChild={props.createChild}
                    onError={props.createUserError}
                    onFinish={(checkedValues) => {
                      checkedValues["parentId"] =
                        props.createUserData.createdUser.user.uuid;
                      props.createChildFunction(checkedValues);
                      console.log(checkedValues);
                    }}
                    setStateValue={(value) => {
                      console.log("step value", value);
                      setStepPage(value);
                    }}
                  />
                ) : (
                  <AssignTeacherToCourseForm />
                )}
              </div>
            ) : props.createChild.createdChild.status === "Success" ? (
              <div>
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
                      // setStepPage(1);
                    }
                  }}
                />
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
                    // setStepPage(1);
                  }
                }}
                onRoleChange={(r) => {
                  setrole(r);
                }}
              />
            )}
            {/* <AssignTeacherToCourseForm /> */}
            
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserSuccess: (limit, page) =>
      dispatch(getAllUserSuccess(limit, page)),
    getAllTeacherSuccess: () => dispatch(getAllTeacherSuccess()),
    getAllParentSuccess: () => dispatch(getAllParentSuccess()),
    getAllAdminSuccess: () => dispatch(getAllAdminSuccess()),

    createUserFunction: (userData) => dispatch(createUser(userData)),
    createChildFunction: (value) => dispatch(createChild(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UserManagementTable));
