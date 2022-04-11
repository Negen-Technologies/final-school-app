import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { createAttendance } from "../../store/CreateAttendance/createAttendanceAction";

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


function AttendanceTable({ students, absenteesDataToParent,attendanceError , attendanceLoading, createAttendance }) {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    selectedRowKeys.length === 0 ? setFilled(false) : null
  }, [selectedRowKeys])

  const onSelectChange = (selectedRow) => {
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
  students.forEach((student) => {
    classId = student.classId;
    studentsList.push({
      key: student.uuid,
      name: `${student.firstName} ${student.lastName}`,
      id: student.uuid,
    });
  });

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
      <Row>
        <Col>
        <Button
        type="primary"
        onClick={() => {
          setFilled(true)
          absenteesDataToParent({
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
        </Col>
        <Col>
        {filled ? <p style={{
          paddingTop: '5px',
          paddingLeft: '16px'
        }}> Attendance checked! Click "Ok" to register the student as absentee.</p> : <p></p>}
        </Col>
      </Row>
      <Row>
      <Col span={24} style={{
        display: 'flex',
        justifyContent: 'end',
        paddingRight: '16px'
      }}>
        <Button
        type="primary"
        onClick={() => {
          createAttendance(selectedRowKeys, date, classId)
          setFilled(false)
          setSelectedRowKeys([])
        }}
                  key="ok"
                  style={{
                    width: 200,
                    marginLeft: "10px",
                  }}
                  disabled= {!filled}
                  loading={attendanceLoading}
                  error={attendanceError}
       >
        Submit
       </Button>
        </Col>
      </Row>
      
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    students: state.requestStudents.students,
    isPending: state.requestStudents.isPending,
    error: state.requestStudents.error,
    attendanceError: state.createAttendance.error,
    attendanceLoading: state.createAttendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAttendance: (studentsId, date, classId) =>
      dispatch(createAttendance(studentsId, date, classId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);
