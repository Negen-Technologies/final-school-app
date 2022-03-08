import React, { useState, useEffect } from "react";
import {
  Select,
  Row,
  Col,
  Button,
  Descriptions,
  Tabs,
  Modal,
  Form,
  Spin,
  Input,
} from "antd";
import { connect } from "react-redux";
import withAuth from "../utils/protectRoute";
import Filter from "../Components/classAssignA/Filter";
import TeachersTable from "../Components/classAssignA/TeachersTable";
import StudentsTable from "../Components/StudentsFilter/StudentsTable";
import { PlusCircleFilled } from "@ant-design/icons";
import {
  assignStudent,
  requestStudentsByFilter,
  assignTeacher,
  getAllTeacherSuccess,
  changeHomeRoom,
} from "../store/index";
import { getUnassignedStudents } from "../store/StudentFilter/StudentFilterAction";
import { getAllCourses } from "../store/Course/CourseAction";

function AssignClassPage({
  filter,
  studentsFiltered,
  classes,
  getUnassignedStudents,
  assignStudent,
  assignStudents,
  getAllCourses,
  getAllTeacherSuccess,
  courses,
  assignTeacher,
  teachers,
  assignedTeacher,
  changeHomeRoom,
}) {
  const [visible, setVisible] = useState(false);
  const [visibleTeacher, setVisibleTeacher] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingTeacher, setConfirmLoadingTeacher] = useState(false);
  const [studentIds, setStudentIds] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [qualifiedTeachers, setQualifiedTeachers] = useState([]);
  const [homeroomTeacherVisible, setHomeroomTeacherVisible] = useState(false);

  // get all courses on load
  useEffect(() => {
    getAllCourses();
    getAllTeacherSuccess();
  }, []);
  useEffect(() => {}, [qualifiedTeachers]);

  useEffect(() => {
    const c = [];

    teachers.forEach((teacher) => {
      teacher.qualifiedCourses.forEach((course) => {
        if (course.courseId === selectedCourse) {
          c.push(
            <Select.Option key={teacher.uuid}>
              {teacher.userInformation.name}
            </Select.Option>
          );
        }
      });
    });
    setQualifiedTeachers(c);
  }, [selectedCourse, teachers]);

  // set courses list as filter changes
  useEffect(() => {
    if (filter.grade) {
      const c = [];
      courses.forEach((element) => {
        if (element.grade === filter.grade) {
          c.push(
            <Select.Option key={element.uuid}>{element.name} </Select.Option>
          );
        }
      });
      setCoursesList(c);
    } else {
      setCoursesList([]);
    }
  }, [filter.grade]);

  const showModal = () => {
    setVisible(true);
  };
  const showModalTeacher = () => {
    setVisibleTeacher(true);
  };
  const showModalHomeroom = () => {
    setHomeroomTeacherVisible(true);
  };

  const getUn = () => {
    if (filter.section && filter.grade) {
      getUnassignedStudents(filter.grade);
    }
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const getClassId = (grade, section) => {
    const classId = classes.find(
      (c) => c.grade === grade && c.section === section
    );
    return classId.uuid;
  };
  const addStudent = (id) => {
    assignStudent(studentIds, id);
  };
  const handleOkTeacher = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoadingTeacher(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoadingTeacher(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancelTeacher = () => {
    setVisibleTeacher(false);
  };
  const handleCancelHomeroom = () => {
    setHomeroomTeacherVisible(false);
  };

  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Select.Option key={i.toString(36) + i}>
        {i.toString(36) + i} | {i}
      </Select.Option>
    );
  }

  const unassignedStudents = [];
  for (let i = 0; i < studentsFiltered.students.length; i++) {
    if (!studentsFiltered.students[i].classId) {
      if (
        !filter.grade ||
        filter.grade === studentsFiltered.students[i].grade
      ) {
        unassignedStudents.push(
          <Select.Option key={studentsFiltered.students[i].uuid}>
            {studentsFiltered.students[i].firstName}
          </Select.Option>
        );
      }
    }
  }

  function handleChange(value) {
    setSelectedCourse(value);
  }
  function handleChangeC(value) {
    setTeacherId(value);
  }
  function handleChangeHomeroom(teacherId, classId) {
    changeHomeRoom(teacherId, classId);
  }

  return (
    <div
      style={{
        width: "80vw",
        margin: "auto auto",
        marginTop: 12,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #DDDDDD",
          borderRadius: "5px",
          padding: "30px",
        }}
      >
        <h1>Manage Classes</h1>
        <Filter></Filter>
      </div>
      <div
        style={{
          width: "65%",
          padding: "10px",
          backgroundColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Descriptions
          bordered
          title="Generate Report Card"
          size="small"
          extra={
            <Button
              // onClick={}
              // disabled={
              //   incomplete !== 0 || !singleClass.class || !data.length > 0
              // }
              onClick={showModalHomeroom}
              type="primary"
              // loading={createReportCardState.loading}
            >
              Add/Change
            </Button>
          }
        >
          <Descriptions.Item label="Grade">{filter.grade}</Descriptions.Item>
          <Descriptions.Item label="Section">
            {filter.section}
          </Descriptions.Item>
          <Descriptions.Item label="Academic Year">2014</Descriptions.Item>
          <Descriptions.Item label="Semester">First</Descriptions.Item>
          <Descriptions.Item label="Homeroom Teacher">
            {filter.section &&
            filter.grade &&
            teachers.find(
              (t) => t.homeroomId === getClassId(filter.grade, filter.section)
            )
              ? teachers.find(
                  (t) =>
                    t.homeroomId === getClassId(filter.grade, filter.section)
                ).userInformation.name
              : "No Homeroom"}
          </Descriptions.Item>
          <div
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {/* {createReportCardState.error === "Validation error"
              ? "Report card has already been created"
              : createReportCardState.error} */}
          </div>
        </Descriptions>
      </div>
      <Row style={{ marginTop: "10px" }}>
        <Col sm={12} span={24}>
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid #DDDDDD",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <h1>Students List</h1>
            <StudentsTable mini={true}></StudentsTable>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginTop: "10px" }}
              icon={<PlusCircleFilled />}
            >
              Add Student
            </Button>
          </div>
        </Col>
        <Col sm={12} span={24}>
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid #DDDDDD",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <h1>Teachers List</h1>
            <TeachersTable
              grade={filter.grade}
              section={`${filter.section}`}
            ></TeachersTable>
            <Button
              type="primary"
              onClick={showModalTeacher}
              style={{ marginTop: "10px" }}
              icon={<PlusCircleFilled />}
            >
              Add a Teacher
            </Button>
          </div>
        </Col>
      </Row>
      <Modal
        title="Add a Students"
        visible={visible}
        onOk={handleOk}
        footer={[
          <Button
            type="primary"
            style={{
              width: 200,
              marginLeft: "10px",
            }}
            onClick={() =>
              addStudent(getClassId(filter.grade, filter.section), studentIds)
            }
            loading={assignStudents.isPending}
            disabled={!filter.section && studentIds}
          >
            Add
          </Button>,
        ]}
        // confirmLoading={isPending}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {studentsFiltered.isPending ? (
          <div>
            <Spin
              style={{
                width: "100%",
                margin: "auto auto",
              }}
              size="large"
            ></Spin>
          </div>
        ) : (
          <div>
            <Filter min={true}></Filter>
            {unassignedStudents.length > 0 ? (
              <div>
                <h5 style={{ margin: "5px" }}>
                  List of unassigned students for grade{" "}
                  {studentsFiltered.students[0].grade}
                </h5>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%", marginBottom: "5px" }}
                  placeholder={
                    false ? "Please Wait" : "Please select a Student"
                  }
                  loading={false}
                  disabled={false}
                  onChange={(val) => {
                    setStudentIds(val);
                  }}
                >
                  {unassignedStudents}
                </Select>
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  {assignStudents.error}
                </div>
                <div
                  style={{
                    color: "green",
                    textAlign: "center",
                  }}
                >
                  {assignStudents.success}
                </div>
              </div>
            ) : (
              <div>
                <Button
                  type="primary"
                  style={{
                    width: 300,
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  onClick={getUn}
                >
                  Get unassigned students list
                </Button>
                <p>
                  Please select a grade with unassigned students to get the list
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
      <Modal
        title="Add a Teacher"
        visible={visibleTeacher}
        onOk={handleOkTeacher}
        footer={[
          <Button
            type="primary"
            style={{
              width: 200,
              marginLeft: "10px",
            }}
            loading={assignedTeacher.isPending}
            onClick={() =>
              assignTeacher(
                teacherId,
                getClassId(filter.grade, filter.section),
                selectedCourse,
                2014
              )
            }
            htmlType="submit"
          >
            Add
          </Button>,
        ]}
        confirmLoading={confirmLoadingTeacher}
        onCancel={handleCancelTeacher}
      >
        {studentsFiltered.isPending ? (
          <div>
            <Spin
              style={{
                width: "100%",
                margin: "auto auto",
              }}
              size="large"
            ></Spin>
          </div>
        ) : (
          <div>
            {/* <Select
              mode="multiple"
              allowClear
              style={{ width: "100%", marginBottom: "5px" }}
              placeholder="Please select students"
              onChange={handleChange}
            >
              {children}
            </Select> */}

            <Filter min={true}></Filter>
            <Select
              allowClear
              disabled={!filter.grade || !filter.section}
              style={{ width: "100%", marginBottom: "5px" }}
              placeholder="Please select a Course"
              onChange={handleChange}
            >
              {coursesList}
            </Select>

            <p style={{ marginTop: "5px", marginLeft: "2px" }}>
              Please select a teacher from list of qualified teachers
            </p>

            <Select
              allowClear
              disabled={!filter.grade || !filter.section}
              style={{ width: "100%", marginBottom: "5px" }}
              placeholder="Please select a Course"
              onChange={handleChangeC}
            >
              {qualifiedTeachers}
            </Select>
            {assignedTeacher.success ? (
              <p style={{ color: "green" }}>
                Teacher Successfully assigned to the class
              </p>
            ) : (
              ""
            )}
            {assignedTeacher.error ? (
              <p style={{ color: "red" }}>
                A Teacher has already been assigned to the class
              </p>
            ) : (
              ""
            )}
          </div>
        )}
      </Modal>
      <Modal
        title="Homeroom Teacher"
        visible={homeroomTeacherVisible}
        onOk={handleChangeHomeroom}
        footer={[
          <Button
            type="primary"
            style={{
              width: 200,
              marginLeft: "10px",
            }}
            htmlType="submit"
          >
            Change
          </Button>,
        ]}
        onCancel={handleCancelHomeroom}
      >
        <Select
          style={{ width: "100%", marginBottom: "5px" }}
          // loading={false}
          // disabled={false}
          // onChange={(val) => {
          //   setStudentIds(val);
          // }}
          placeholder="Please select a teacher"
        ></Select>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    assignedTeacher: state.assignTeacher,
    isPending: state.assignTeacher.isPending,
    error: state.assignTeacher.error,
    filter: state.classList.filter,
    studentsFiltered: state.requestStudentsByFilter,
    classes: state.classList.classes,
    assignStudents: state.assignStudent,
    courses: state.courseList.courses,
    teachers: state.teacher.teachers,
    changeHomeRoomReducer: state.changeHomeRoomReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    assignTeacher: (teacherIds, classId, courseId, academicYear) =>
      dispatch(assignTeacher(teacherIds, classId, courseId, academicYear)),
    assigningStudent: (studentId) => dispatch(assignStudent(studentId)),
    requestStudentsByFilter: (classId, params) =>
      dispatch(requestStudentsByFilter(classId, params)),
    getUnassignedStudents: (grade) => dispatch(getUnassignedStudents(grade)),
    assignStudent: (studentIds, classId) =>
      dispatch(assignStudent(studentIds, classId)),
    getAllCourses: () => dispatch(getAllCourses()),
    getAllTeacherSuccess: () => dispatch(getAllTeacherSuccess()),
    changeHomeRoom: (teacherId, classId) =>
      dispatch(changeHomeRoom(teacherId, classId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(AssignClassPage));
