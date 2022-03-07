import React from "react";
import {
  Table,
  Badge,
  Button,
  Menu,
  Descriptions,
  Dropdown,
  Icon,
  Result,
  Row,
  Col,
} from "antd";
import withAuth from "../../utils/protectRoute";
import { connect } from "react-redux";
import Filter from "../classAssignA/Filter";
import { useState, useEffect } from "react";
import { classRankAction } from "../../store/ClassRank/classRankAction";
import { primary_color } from "../../utils/constants";
import { createReportCard } from "../../store/ReportCard/reportCardAction";

function TranscriptClass({
  singleClass,
  classRankAction,
  studentRank,
  createReportCard,
  createReportCardState,
}) {
  // sate columns state
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [incomplete, setIncomplete] = useState(0);

  useEffect(() => {
    if (singleClass) {
      if (!!singleClass.class) {
        setGrade(singleClass.class.grade);
        setSection(singleClass.class.section);
        let c = [
          {
            title: "Name",
            dataIndex: "name",
            key: 0,
          },
        ];
        singleClass.class.coursesList.forEach((element, i) => {
          c.push({
            title: element.courseInformation.name,
            dataIndex: element.courseId,
            key: element.courseId,
          });
        });
        c = c.concat([
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
          },
          {
            title: "Average",
            dataIndex: "average",
            key: "average",
          },
          {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
          },
        ]);

        setColumns(c);
        classRankAction(singleClass.class.uuid);
      } else {
        setColumns([]);
      }
    }
  }, [singleClass]);

  useEffect(() => {
    if (studentRank.length > 0) {
      let d = [];
      studentRank.forEach((element, i) => {
        let row = {
          key: i,
          name: element.firstName + " " + element.lastName,
          total: element.totalResult,
          average: element.average,
          rank: element.rank,
        };
        // for array coursesList in element add as key and value
        element.coursesList.forEach((course, j) => {
          row[course.courseId] = course.result;
        });
        d.push(row);
      });

      setData(d);
    } else {
      setData([]);
    }
  }, [studentRank]);

  useEffect(() => {
    //check if totalvalue and totalResult are equal for each student in studentRank
    let incomplete = 0;
    studentRank.forEach((element, i) => {
      if (studentRank[0].coursesList.length * 100 !== element.totalValue) {
        incomplete++;
      }
    });
    setIncomplete(incomplete);
  }, [studentRank]);

  const handleGenerate = () => {
    const finalData = [];
    studentRank.forEach((element, i) => {
      finalData.push({
        studentId: element.uuid,
        coursesAndResults: element.coursesList.map((c) => {
          return {
            courseId: c.courseId,
            result: c.result,
          };
        }),
      });
    });
    createReportCard(singleClass.class.uuid, finalData);
  };

  return (
    <div>
      <h1>Select Class</h1>
      <Filter add={false} />
      <Row>
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
                onClick={handleGenerate}
                disabled={
                  incomplete !== 0 || !singleClass.class || !data.length > 0
                }
                type="primary"
                loading={createReportCardState.loading}
              >
                Generate
              </Button>
            }
          >
            <Descriptions.Item label="Grade">{grade}</Descriptions.Item>
            <Descriptions.Item label="Section">{section}</Descriptions.Item>
            <Descriptions.Item label="Academic Year">2014</Descriptions.Item>
            <Descriptions.Item label="Semester">First</Descriptions.Item>
            <Descriptions.Item label="Total Students">
              {data.length}
            </Descriptions.Item>
            <Descriptions.Item label="Students with incomplete results">
              {incomplete}
            </Descriptions.Item>
            <div
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {createReportCardState.error === "Validation error"
                ? "Report card has already been created"
                : createReportCardState.error}
            </div>
          </Descriptions>
        </div>

        <div
          style={{
            padding: "10px",
            border: `5px solid ${primary_color}`,
            width: "30%",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
            // height: "152px",
          }}
        >
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
            doloremque nobis modi quaerat distinctio nemo a rem mollitia? Illo
            eum accusantium delectus! Iste saepe, accusamus perferendis amet
            repudiandae architecto magni.
          </p>
        </div>
      </Row>
      {createReportCardState.success ? (
        <Result
          status="success"
          title="You Have successfully Generated Report Card"
          style={{ margin: "10px auto" }}
          extra={[
            <Button type="primary" key="console">
              Go Back to Home
            </Button>,
          ]}
        />
      ) : (
        <Table
          style={{ marginTop: "10px" }}
          className="components-table-demo-nested"
          columns={columns}
          // expandedRowRender={expandedRowRender}
          dataSource={data}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //students
    students: state.requestStudents.students,
    selectedId: state.requestStudentsByFilter.selectedId,
    singleClass: state.singleClass,
    studentRank: state.classRank.studentRank,
    createReportCardState: state.createReportCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //students
    classRankAction: (classId) => dispatch(classRankAction(classId)),
    createReportCard: (classId, data) =>
      dispatch(createReportCard(classId, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(TranscriptClass));
