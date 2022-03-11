import React, { useState, useEffect } from "react";
import withAuth from "../utils/protectRoute";
import AttendanceMonth from "../Components/AttendanceComponents/AttendanceMonth";
import DaysLateCard from "../Components/AttendanceComponents/DaysLateCard";
import StudentFilter from "../Components/StudentsFilter/StudentsFilterCriteria";
import StudentListTable from "../Components/AttendanceComponents/studentListTable";
import StudentAttendance from "../Components/StudentOverviewComponents/StudentAttendance";
import { studentAttendanceDetail } from "../store/AdminAttendance/AdminAttendanceAction";

import { connect } from "react-redux";
import Router from "next/router";
import { Modal, Button } from "antd";

function adminAttendancePage({
  singleStudentAttendance,
  loadingTrue,
  studentId,
}) {
  const [studentsid, setstudentsid] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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
          alignContent: "center",
          padding: "20px",
        }}
      >
        <h1>Filter a Class for Attendance</h1>
        <StudentFilter isForGradeChange={false} style={{ marginTop: "20px" }} />
      </div>
      <StudentListTable
        isToCreateAttendance={true}
        showModalFunc={showModal}
        getid={(id) => {
          setstudentsid(id);
        }}
      />
      <Modal
        title="Attendance"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={"95vw"}
        bodyStyle={{ width: "100%" }}
        footer={[
          <Button
            type="primary"
            key="ok"
            style={{
              width: 200,
              marginLeft: "10px",
            }}
            onClick={handleCancel}
          >
            Ok
          </Button>,
        ]}
      >
        <StudentAttendance
          studId={studentsid}
          studentAttendance={[{ year: "2020", month: "02", day: 15 }]}
        />
      </Modal>

      {/* <AttendanceMonth day={'2021-1-2'}
                absentDays={[]} />
            <DaysLateCard day={5}
              label="Days Absent"
              col="#eb6841" /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    singleStudentAttendance: state.singleStudentAttendance,
    studentId: state.requestStudentsByFilter.selectedId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
    studentAttendanceDetail: (studId) =>
      dispatch(studentAttendanceDetail(studId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(adminAttendancePage));
