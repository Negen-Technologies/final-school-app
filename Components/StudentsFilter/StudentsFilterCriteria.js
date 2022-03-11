// import React, { useState, useEffect } from "react";
import {
  Select,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import gradeChange from "../../pages/gradeChange";
import { getClassList, loadingTrue } from "../../store";
import { requestStudents } from "../../store/StudentFilter/StudentFilterAction";
import { getAssessment } from "../../store/GradeChange/gradeChangeAction";
import { createAssessmentAction } from "../../store/CreateAssessment/createAssessmentAction";
function StudentsFilterCriteria({
  studentId,
  isToCreateAttendance,
  createAssessment,
  createAssessmentLoading,
  createAssessmentError,
  isForGradeChange,
  isPending,
  loading,
  error,
  onRequestStudents,
  getAssessment,
  classList,
  loadingTrue,
  getClassList,
  token,
  assessment,
}) {
  useEffect(() => {
    if (classList.length == 0) {
      loadingTrue();
      getClassList(token);
    }
    if (assessment) {
      assessment.forEach((element) => {
        totalAssessmentValue = +assessment.value;
      });
    }
  }, []);

  const [sectionsList, setSectionsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [section, setSection] = useState();
  const [course, setCourse] = useState();
  const [courseId, setCourseId] = useState();
  const [visible, setVisible] = useState(false);
  const [semester, setSemester] = useState(1);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentValue, setAssessmentValue] = useState("");

  const [grade, setGrade] = useState();
  const classes = [];
  const coursesInTheClass = [];
  var totalAssessmentValue = 0;
  classList.forEach((element) => {
    const cl = classes.findIndex((c) => c.grade == element.grade);
    if (cl > -1) {
      classes[cl].sections = [
        ...classes[cl].sections,
        { value: element.section, key: element.section },
      ];
    } else {
      classes.push({
        key: element.uuid,
        grade: element.grade,
        sections: [{ value: element.section, key: element.section }],
        courses: element.coursesList,
      });
      if (isForGradeChange) {
        coursesInTheClass.push(element.coursesList);
      }
    }
  });
  const crsList = [];

  const handleClassChange = (value) => {
    const i = classes.findIndex((c) => c.grade == value);
    setSectionsList(classes[i].sections);
    setGrade(classes[i].grade);
    setSection(classes[i].sections[0].value);

    if (isForGradeChange) {
      const classSelected = classList.find(
        (c) => c.grade == value && c.section == classes[i].sections[0].value
      );
      classSelected.coursesList.forEach((course) => {
        crsList.push({
          key: course.uuid,
          name: course.courseInformation.name,
        });
      });
      if (crsList.length > 0) {
        setCourseList(crsList);
        setCourse(crsList[0].name);
        setCourseId(crsList[0].key);
      } else {
        setCourseList([])
        setCourse()
        setCourseId()
      }
    }
  };

  const handleCourseChange = (value) => {
    // setCoursesList(value)
    setCourse(value);
    const indx = courseList.findIndex((i) => i.name == value);
    setCourseId(courseList[indx].key);
  };

  const handleSectionChange = (value) => {
    setSection(value);
  };

  const onFinish = () => {
    const cl = classList.find((c) => c.grade == grade && c.section == section);
    if (isForGradeChange) {
      getAssessment(courseId);
    } else {
      onRequestStudents(cl.uuid);
    }
  };

  const showAssessmentModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    createAssessment(assessmentTitle, assessmentValue, courseId, semester);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Col >
        {/* <div
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </div> */}
        {isForGradeChange ? (
          <Col span={24}>
            <Row>
              <Col
                xs={24}
                sm={6}
                lg={6}
                xl={6}
                // style={{ marginRight: "5px" }}
                className="gutter-row"
              >
                <Select
                  style={{ width: "100%", marginBottom: "2px" }}
                  onChange={(value) => handleClassChange(value)}
                  placeholder="Select Class"
                >
                  {classes.map((cl) => (
                    <Select.Option value={cl.grade} key={cl.grade}>
                      {cl.grade}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col
                xs={24}
                sm={6}
                lg={6}
                xl={6}
                // style={{ marginRight: "5px" }}
                className="gutter-row"
              >
                <Select
                  style={{ width: "100%", marginBottom: "2px" }}
                  value={section}
                  onChange={handleSectionChange}
                  placeholder="Select Section"
                >
                  {sectionsList.map((sec) => (
                    <Select.Option key={sec.key}>{sec.value}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col
                xs={24}
                sm={6}
                lg={6}
                xl={6}
                // style={{ marginRight: "5px" }}
                className="gutter-row"
              >
                <Select
                  style={{ width: "100%", marginBottom: "2px" }}
                  value={course}
                  onChange={handleCourseChange}
                  placeholder="Select Course"
                >
                  {courseList.map((course) => (
                    <Select.Option key={course.name}>
                      {course.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24}
                sm={6}
                lg={6}
                xl={6} 
                // style={{ marginRight: "5px" }}
                >
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                    marginBottom: "2px",
                  }}
                  onClick={onFinish}
                  htmlType="submit"
                  loading={!isForGradeChange ? isPending : loading}
                  error={error}
                  disabled={!course}
                >
                  Filter
                </Button>
              </Col>
            </Row>
            <Row>
              <Col
                xs={24}
                sm={6}
                lg={6}
                xl={6}
                style={{ paddingTop: "10px" }}
              >
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                    marginBottom: "2px",
                  }}
                  onClick={showAssessmentModal}
                  htmlType="submit"
                  error={error}
                  disabled={
                    !section ||
                    totalAssessmentValue == 100 ||
                    totalAssessmentValue == 0
                  }
                >
                  Create Assessment
                </Button>
              </Col>
            </Row>
            <Modal
              title="Create Assessment"
              visible={visible}
              onCancel={handleCancel}
              bodyStyle={{ width: "100%" }}
              footer={[
                <Button
                  type="primary"
                  key="ok"
                  style={{
                    width: 100,
                    marginLeft: "10px",
                  }}
                  onClick={handleOk}
                  loading={createAssessmentLoading}
                  error={createAssessmentError}
                >
                  Ok
                </Button>,
              ]}
            >
              <Col span={24}>
                <Row>
                  <Col xs={12} xl={12} style={{ padding: "10px" }}>
                    <h3>Assessment Title: </h3>
                  </Col>
                  <Col xs={12} xl={12} style={{ padding: "10px" }}>
                    <Input
                      onChange={(value) => {
                        setAssessmentTitle(value.target.value);
                      }}
                      placeholder="Final Exam"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} xl={12} style={{ padding: "10px" }}>
                    <h3>Assessment Value: </h3>
                  </Col>
                  <Col xs={12} xl={12} style={{ padding: "10px" }}>
                    <Input
                      onChange={(value) => {
                        setAssessmentValue(value.target.value);
                      }}
                      placeholder="40"
                      type="number"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} xl={12} style={{ padding: "10px" }}>
                    <h3>Semester: </h3>
                  </Col>
                  <Col xs={12} xl={12} style={{ padding: "10px" }}>
                    <Select
                      style={{ width: "100%", marginBottom: "2px" }}
                      value={semester}
                      onChange={(value) => {
                        setSemester(value);
                      }}
                      placeholder="Select Course"
                    >
                      <Select.Option key={1}>1</Select.Option>
                      <Select.Option key={2}>2</Select.Option>
                      <Select.Option key={3}>3</Select.Option>
                      <Select.Option key={4}>4</Select.Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
            </Modal>
          </Col>
        ) : (
          <Row>
            <Col
              xs={6}
              sm={6}
              lg={6}
              xl={6}
              style={{ marginRight: "5px" }}
              className="gutter-row"
            >
              <Select
                style={{ width: "100%", marginBottom: "2px" }}
                onChange={(value) => handleClassChange(value)}
                placeholder="Select Class"
              >
                {classes.map((cl) => (
                  <Select.Option value={cl.grade} key={cl.grade}>
                    {cl.grade}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col
              xs={6}
              sm={6}
              lg={6}
              xl={6}
              style={{ marginRight: "5px" }}
              className="gutter-row"
            >
              <Select
                style={{ width: "100%", marginBottom: "2px" }}
                value={section}
                onChange={handleSectionChange}
                placeholder="Select Section"
              >
                {sectionsList.map((sec) => (
                  <Select.Option key={sec.key}>{sec.value}</Select.Option>
                ))}
              </Select>
            </Col>

            <Col xs={6}
                sm={6}
                lg={6}
                xl={6} style={{ marginRight: "5px" }}>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  marginBottom: "2px",
                }}
                onClick={onFinish}
                htmlType="submit"
                loading={!isForGradeChange ? isPending : loading}
                error={error}
                disabled={!section}
              >
                Filter
              </Button>
            </Col>
          </Row>
        )}
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.requestStudents.students,
    isPending: state.requestStudents.isPending,
    error: state.requestStudents.error,
    classList: state.classList.classes,
    token: state.auth.token,
    loading: state.getAssessment.loading,
    createAssessment: state.createAssessment,
    createAssessmentLoading: state.createAssessment.loading,
    createAssessmentError: state.createAssessment.error,

    assessment: state.getAssessment.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestStudents: (stdName, stdId, stdClass, stdSection) =>
      dispatch(requestStudents(stdName, stdId, stdClass, stdSection)),
    getAssessment: (id) => dispatch(getAssessment(id)),
    getClassList: (token) => dispatch(getClassList(token)),
    createAssessment: (assessmentTitle, assessmentValue, courseId, semester) =>
      dispatch(
        createAssessmentAction(
          assessmentTitle,
          assessmentValue,
          courseId,
          semester
        )
      ),
    loadingTrue: () => dispatch(loadingTrue()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsFilterCriteria);
