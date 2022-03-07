import React from "react";
import { Table } from "antd";
import { connect } from "react-redux";

const dataSource = [
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 300,
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "Class",
    dataIndex: "class",
    width: 200,
  },
  {
    title: "Section",
    dataIndex: "section",
    width: 200,
  },
];

function StudentsList(props) {
  var studentsListInClass = [];
  studentsListInClass.splice(0, studentsListInClass.length);

  props.students.forEach((student) => {
    studentsListInClass.push({
      key: student.uuid,
      name: `${student.firstName} ${student.lastName}`,
      id: student.uuid,
    });
  });

  if (studentsListInClass.length == 0) {
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  } else {
    return (
      <div>
        <Table columns={columns} dataSource={studentsListInClass} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.requestStudents.students,
    isPending: state.requestStudents.isPending,
    error: state.requestStudents.error,

    // teachers: state.assignClass.teachers,
    // teachersIsPending: state.assignClass.isPending,
    // teachersIsError: state.assignClass.error,

    // classes: state.assignClass.classes,
    // isPending: state.assignClass.isPending,
    // error: state.assignClass.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
