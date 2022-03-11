import React, { useEffect, useState } from "react";
import { Table, Collapse, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { primary_color } from "../../utils/constants";
const { Panel } = Collapse;

function StudentAssesment({ studentassesmentdata }) {
  const [listOfCourses, setstudentassesmentdata] = useState([]);

  useEffect(() => {
    if (Object.keys(studentassesmentdata.studentdata).length > 0) {
      var temparr = [];
      studentassesmentdata.studentdata.class.coursesList.forEach((course) => {
        temparr.push({
          courseName: course.courseInformation.name,
          key: course.courseId,
          teacherName: course.teacherInformation.userInformation.name,
          semester1:
            course.results.semester1 == null ||
            Object.keys(course.results.semester1).length <= 0
              ? {
                  total: "",
                  totalResult: "",
                  assessments: [],
                }
              : {
                  total: course.results.semester1.total,
                  totalResult: course.results.semester1.totalResult,
                  assessments: course.results.semester1.assessments.map(
                    (assessment) => {
                      return {
                        name: assessment.name,
                        value: assessment.value,
                        result: assessment.result,
                        resultId: assessment.resultId,
                      };
                    }
                  ),
                },
          semester2:
            course.results.semester2 == null ||
            Object.keys(course.results.semester2).length <= 0
              ? {
                  total: "",
                  totalResult: "",
                  assessments: [],
                }
              : {
                  total: course.results.semester2.total,
                  totalResult: course.results.semester2.totalResult,
                  assessments: course.results.semester2.assessments.map(
                    (assessment) => {
                      return {
                        name: assessment.name,
                        value: assessment.value,
                        result: assessment.result,
                        resultId: assessment.resultId,
                      };
                    }
                  ),
                },
        });
      });
      setstudentassesmentdata(temparr);
    }
  }, [studentassesmentdata.studentdata]);

  function customTable(arr) {
    return arr.length == 0 ? (
      <>
        <p>No data for the selected semister!</p>
      </>
    ) : (
      <div
        style={{
          width: "500px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: primary_color,
            height: "50px",
            color: "white",
          }}
        >
          <Row align="middle" style={{ overflow: "auto" }}>
            {arr.map((assessment) => (
              <Col
                span={6}
                style={{ padding: "5px" }}
                key={assessment.resultId}
              >
                {assessment.name}({assessment.value})
              </Col>
            ))}
          </Row>
        </div>
        <div
          style={{
            backgroundColor: "#ddd",
            height: "50px",
            color: primary_color,
            // width: "500px",
          }}
        >
          <Row align="middle" justify="center">
            {arr.map((assessment, i) => (
              <Col
                span={6}
                style={{ paddingTop: "10px", textAlign: "center" }}
                key={assessment.resultId}
              >
                {assessment.result}
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
    },
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
    },
    {
      title: "Semester-1 Total",
      dataIndex: "semester1",
      editable: true,
      render: (_, record) => {
        return `${record.semester1.totalResult}/${record.semester1.total}`;
      },
    },
    {
      title: "Semester-2 Total",
      dataIndex: "semester2",
      width: "40%",
      editable: true,
      render: (_, record) => {
        return record.semester2.totalResult == ""
          ? "No Data"
          : `${record.semester2.totalResult}/${record.semester2.total}`;
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        loading={studentassesmentdata.loading}
        dataSource={listOfCourses}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <Collapse bordered={false}>
                <Panel header="Semester 1" key="1">
                  {customTable(record.semester1.assessments)}
                </Panel>
                <Panel header="Semester 2" key="2">
                  {customTable(record.semester2.assessments)}
                </Panel>
              </Collapse>
            </div>
          ),
          expandRowByClick: true,
        }}
      />
    </div>
  );
}

export default StudentAssesment;
