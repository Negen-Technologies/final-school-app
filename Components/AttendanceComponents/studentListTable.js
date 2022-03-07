import React, { useState } from "react";
import { Col, Input, Row, Table ,Button, Modal} from "antd";
import { connect } from "react-redux";
import { setStudentsId } from "../../store/StudentFilter/StudentFilterAction";
import {studentAttendanceDetail} from "../../store/AdminAttendance/AdminAttendanceAction"
import AttendanceTable from "../CreateAttendanceComponents/attendanceTable";
import { createAttendance } from "../../store/CreateAttendance/createAttendanceAction";

const dataSource = [];
var studentsList = [];

function StudentListTable({ 
  students, mini, studentAttendanceDetail, attendanceError, attendanceLoading, createAttendance, showModalFunc,getid, isToCreateAttendance, isPending, error}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [absenteeData, setAbsenteeData] = useState()

  const showModal = () => { 
    setVisible(true);
  };


  const handleOk = () => {
    setConfirmLoading(true);
    createAttendance(absenteeData.studentsId, absenteeData.date, absenteeData.classId)
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    // {
    //   title: "Days Absent (for last 7 days)",
    //   dataIndex: "absent",
    // },
    
    {
      title: "",
      dataIndex: "opration",
      render: (_, record) =><Button
          type="primary"
          style={{
            width: 120,
            marginBottom: "2px",
          }}
          onClick={() => {
            studentAttendanceDetail(record.id)
            getid(record.id)
            showModalFunc(record.id)
            
          }}
        >
          Details
        </Button>
      
    },
  ];

  const miniColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Days Absent (for last 7 days)",
      dataIndex: "absent",
    },
  ];

  const [searchField, setsearchField] = useState("");

  studentsList.splice(0, studentsList.length);
  students.forEach((student) => {
    studentsList.push({
      key: student.uuid,
      name: `${student.firstName} ${student.lastName}`,
      id: student.uuid,
      class: student.class.grade,
      section: student.class.section,
    });
  });

  const filteredStudents = studentsList.filter((stu) => {
    return stu.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const absenteesDataToParent = (data) => {
    setAbsenteeData(data)
  }

  if (students.length == 0) {
    return (
      <div style={{}}>
        <Table
          columns={mini ? miniColumns : columns}
          dataSource={dataSource} /*onChange={onChange}*/
        />
      </div>
    );
  } else {
    return (
      <div style={{}}>
        <Row>
          <h3 style={{ marginLeft: "4" }}>Search by Name</h3>
          <Input
            style={{ width: "240px", marginBottom: "10px", marginLeft: "10px" }}
            onChange={(input) => {
              setsearchField(input.target.value);
            }}
          />
          {isToCreateAttendance ? <Col>
            <Col style={{ marginRight: "5px", paddingLeft: "20px" }}>
            <Button
              type="primary"
              style={{
                width: 220,
                marginBottom: "2px",
              }}
              
              onClick={() => {
                showModal()
              }}
              htmlType="submit"
              loading={isPending}
              error={error}
              // disabled={!section}
            >
              Fill Attendance
            </Button>
          </Col>
          </Col>: <div></div>}
        </Row>
        <Table
          scroll={{ x: true }}
          columns={mini ? miniColumns : columns}
          dataSource={filteredStudents} /*onChange={onChange}*/
        />
        <Modal 
              title="Fill Students Attendance"
              visible={visible}
              // onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              width={'80vw'}
              bodyStyle={{ width: "100%"}}
              footer={[
                <Button
                  type="primary"
                  key="ok"
                  style={{
                    width: 200,
                    marginLeft: "10px",
                  }}
                  onClick = {handleOk}
                    loading={attendanceLoading}
                    error={attendanceError}
                >
                  Ok
                </Button>
              ]}>
             <AttendanceTable absenteesDataToParent = {absenteesDataToParent} />
          </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.requestStudents.students,
    isPending: state.requestStudents.isPending,
    error: state.requestStudents.error,
    adminAttendanceReducer: state.adminAttendanceReducer,
    attendanceError: state.createAttendance.error,
    attendanceLoading: state.createAttendance.isPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: () => dispatch(requestStudentsByFilter(classId)),
    studentAttendanceDetail: (studId) => dispatch(studentAttendanceDetail(studId)),
    setStudentId: (studentId) => dispatch(setStudentsId(studentId)),
    createAttendance: (studentsId, date, classId) => dispatch(createAttendance(studentsId, date, classId))
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentListTable);
