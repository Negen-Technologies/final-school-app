import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { connect } from "react-redux";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Id",
    dataIndex: "id",
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    id: 32,
  });
}

function AttendanceTable({ students, absenteesDataToParent,attendanceError , attendanceLoading }) {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  }, []);
  // debugger
  const onSelectChange = (selectedRow) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;

  var studentsList = [];
  var date = new Date().toISOString();
  var classId = "";

  studentsList.splice(0, studentsList.length);
  console.log("=========");
  console.log(students);
  students.forEach((student) => {
    classId = student.classId;
    studentsList.push({
      key: student.uuid,
      name: `${student.firstName} ${student.lastName}`,
      id: student.uuid,
    });
  });
  console.log(classId);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={studentsList}
      />
      <Button
        type="primary"
        onClick={() => {absenteesDataToParent({
          date: date,
          classId: classId,
          studentsId: selectedRowKeys ? selectedRowKeys : [],
        })}}
        disabled={!hasSelected}
        loading={attendanceLoading}
        error={attendanceError}
      >
        Fill Attendance
      </Button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    students: state.requestStudents.students,
    isPending: state.requestStudents.isPending,
    error: state.requestStudents.error,
    attendanceError: state.createAttendance.error,
    attendanceLoading: state.createAttendance.isPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAttendance: (studentsId, date, classId) =>
      dispatch(createAttendance(studentsId, date, classId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);
