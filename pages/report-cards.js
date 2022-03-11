import React from "react";
import SingleReportCard from "../Components/ReportCard/SingleReportCard";
import { Button, Col, Input, Row, Select } from "antd";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import Filter from "../Components/classAssignA/Filter";
import StudentsTable from "../Components/StudentsFilter/StudentsTable";

function ReportCards({ students, selectedId }) {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Row>
        <Col span={24} md={9}>
          <h1
            style={{
              textAlign: "center",
              margin: "10px 0px",
              fontSize: "19px",
            }}
          >
            Filter by Class
          </h1>
          <Filter add={false} />
          <h1
            style={{
              textAlign: "center",
              margin: "10px 0px",
              fontSize: "19px",
            }}
          >
            Students List
          </h1>
          <StudentsTable detail={true}></StudentsTable>
        </Col>
        <Col span={0} md={1}></Col>
        <Col span={24} md={14}>
          <div style={{ height: "89vh", overflow: "scroll" }}>
            <SingleReportCard
              student={students.find((student) => student.uuid === selectedId)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    //students
    students: state.requestStudents.students,
    selectedId: state.requestStudentsByFilter.selectedId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(ReportCards));
