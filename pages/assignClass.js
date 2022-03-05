import React, { useState, useEffect } from "react";
import { Select, Row, Col, Button, Tabs, Modal, Form, Spin, Input } from "antd";
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
}) {
  const [visible, setVisible] = useState(false);
  const [visibleTeacher, setVisibleTeacher] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingTeacher, setConfirmLoadingTeacher] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [studentIds, setStudentIds] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [qualifiedTeachers, setQualifiedTeachers] = useState([]);

  // get all courses on load
  useEffect(() => {
    getAllCourses();
    getAllTeacherSuccess();
  }, []);
  useEffect(() => {
    console.log("qualifiedTeachers", qualifiedTeachers);
  }, [qualifiedTeachers]);

  useEffect(() => {
    const c = [];
    // console.log(selectedCourse, teachers, "test");

    teachers.forEach((teacher) => {
      // if selectedCorse in teacher.qualifiedCourses
      teacher.qualifiedCourses.forEach((course) => {
        if (course.courseId === selectedCourse) {
          c.push(
            <Select.Option key={teacher.uuid}>
              {teacher.userInformation.name}
            </Select.Option>
          );
        }
      });
      console.log(c);
    });
    console.log(c, "final");
    setQualifiedTeachers(c);
    console.log(c, qualifiedTeachers);
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
    console.log(id, studentIds);
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
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleCancelTeacher = () => {
    console.log("Clicked cancel button");
    setVisibleTeacher(false);
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
  console.log(studentsFiltered, unassignedStudents);
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
            // loading={isPending}
            // error={error}
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
            {/* <Select
              mode="multiple"
              allowClear
              style={{ width: "100%", marginBottom: "5px" }}
              placeholder="Please select students"
              onChange={handleChange}
            >
              {children}
            </Select> */}
            {/* <Input
              style={{ width: "100%", marginBottom: "5px" }}
              onChange={(val) => setStudentId(val.target.value)}
              placeholder="Student Id"
            /> */}
            {/* {assignStudents.error}
            {assignStudent.success} */}

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
            // loading={isPending}
            // error={error}
          >
            Add
          </Button>,
        ]}
        // confirmLoading={isPending}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(AssignClassPage));
// export default withAuth(AssignClassPage)
