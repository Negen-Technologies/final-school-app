import React, { useState } from "react";
import { Col, Input, Row, Table } from "antd";
import { connect } from "react-redux";

const dataSource = [];
var teachersList = [];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Course",
    dataIndex: "course",
  },
];

const miniColumns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
];

function TeachersTable({ classes, mini, grade = 0, section }) {
  const [searchField, setsearchField] = useState("");
  const cl = classes.find((cl) => cl.grade == grade && cl.section == section);

  if (!cl || cl.coursesList.length == 0) {
    return (
      <div style={{}}>
        <Table
          columns={mini ? miniColumns : columns}
          dataSource={dataSource} /*onChange={onChange}*/
        />
      </div>
    );
  } else {
    teachersList.splice(0, teachersList.length);
    cl.coursesList.forEach((course) => {
      teachersList.push({
        key: course.teacherId,
        name: course.teacherInformation.userInformation.name,
        id: course.teacherId,
        course: course.courseInformation.name,
      });
    });
    console.log(teachersList);
    const filteredTeachers = teachersList.filter((stu) => {
      return stu.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
      <div style={{}}>
        <Row>
          <h3 style={{ marginLeft: "4" }}>Search by Name</h3>
          <Input
            style={{ width: "240px", marginBottom: "10px", marginLeft: "10px" }}
            onChange={(input) => {
              setsearchField(input.target.value);
              console.log(input.target.value);
            }}
          />
        </Row>
        <Table
          columns={mini ? miniColumns : columns}
          dataSource={filteredTeachers} /*onChange={onChange}*/
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    classes: state.classList.classes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(TeachersTable);
