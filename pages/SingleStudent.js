import React, { useState,useEffect} from "react";
import { Button, Col, DatePicker, Divider, Row, Select, Tabs } from "antd";

import StudentCard from "../Components/StudentOverviewComponents/StudentCard";
import StudentBio from "../Components/StudentOverviewComponents/StudentBio";
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import StudentOverview from "../Components/StudentOverviewComponents/StudentOverview";
import StudentAttendance from "../Components/StudentOverviewComponents/StudentAttendance";
import  SingleReportCard  from"../Components/ReportCard/SingleReportCard";
import { EditOutlined } from "@ant-design/icons";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { useRouter } from 'next/router'

import {
  getSingleStudentAttendance,
  getSingleStudentInfo,
  updateSingleStudentInfo,
  updateParentInfo,
} from "../store/index";
import "../store/SingleStudentAttendance/singleStudentAttendanceAction"
import "../store/singleStudentInfo/singleStudentInfoAction"

import {StudentContext} from "../utils/studentsContext"
const { TabPane } = Tabs;

const SingleStudent = ({
  studentAttendanceAction,
  studentAttendance,
  singleStudentInfo,
  studentInfoAction,
  updateSingleStudentInfo,
  updateParentInfo,
  
}) => {
  const [tab, setTab] = useState("1");
  const [display, setDisplay] = useState(false);
  const router = useRouter()
  console.log('router query',router.query)
  const { studentid } = router.query
  useEffect(() => {
    if (
      (studentid !== undefined || null) &&
      tab == 1 &&
      studentAttendance.attendance.length == 0
    ) {
      studentAttendanceAction(studentid);
    }
  }, [tab, studentid]);

  useEffect(() => {
    if ((studentid !==undefined||null) && singleStudentInfo.info == null) {
      studentInfoAction(studentid);
    }
  }, [studentid]);

console.log('sdf', singleStudentInfo)
  function callback(key) {
    console.log('key ',key);
    setTab(key);
  }
  const notifications = [
    {
      name: "Administrator, Eleni",
      src: "/images/sampleWoman.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
    {
      name: "Staff, Iyasu",
      src: "/images/sampleMan.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
    {
      name: "Staff, Aamnuel",
      src: "/images/sampleMan.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
    {
      name: "Teacher, Kidst",
      src: "/images/sampleWoman.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
    {
      name: "Administrator, Henok",
      src: "/images/sampleMan.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
  ];
  return (
    <div
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      
      <StudentCard singleStudentInfo={singleStudentInfo}></StudentCard>
      <Tabs
        style={{ marginTop: "5px" }}
        type="card"
        defaultActiveKey="1"
        onChange={callback}
      >
        <TabPane tab="Overview" key="1">
          <StudentOverview
            studentAttendance={studentAttendance}
          ></StudentOverview>
        </TabPane>
        <TabPane tab="Notification" key="2">
          <Row justify="space-between">
            <Col xs={24} lg={12} xl={16}>
              <NotificationsPagination
                notifications={notifications}
              ></NotificationsPagination>
            </Col>
            <Col xs={24} lg={7} xl={7}>
              <Divider orientation="Center">Filter by</Divider>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Notification Writer"
              ></Select>
              <Divider orientation="left">Start Date</Divider>
              <DatePicker size="large" style={{ width: "100%" }}></DatePicker>
              <Divider orientation="left">End Date</Divider>
              <DatePicker size="large" style={{ width: "100%" }}></DatePicker>
              <Button
                block={true}
                size="large"
                type="primary"
                style={{ marginTop: "20px" }}
                icon={<EditOutlined></EditOutlined>}
                onClick={() => router.push('/notifications')}

              >
                Create Notification
              </Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Attendance" key="3">
          <StudentAttendance
            fromSingleStudent= {true}
            studentAttendance={studentAttendance}
          ></StudentAttendance>
        </TabPane>
        <TabPane tab="Report-Card" key="4">
          <SingleReportCard student={singleStudentInfo.info}/>
        </TabPane>
        {/* <TabPane tab="Records" key="5">
          Record
        </TabPane>
        <TabPane tab="Transcript" key="6">
          Transcript
        </TabPane> */}
      </Tabs>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    studentAttendance: state.singleStudentAttendance,
    singleStudentInfo: state.singleStudentInfo,
    // studentId: state.requestStudentsByFilter.selectedId,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    studentAttendanceAction: (id) => dispatch(getSingleStudentAttendance(id)),
    studentInfoAction: (id) => dispatch(getSingleStudentInfo(id)),
    updateSingleStudentInfo:(data)=>dispatch(updateSingleStudentInfo(data)),
    updateParentInfo:(data)=>dispatch(updateParentInfo(data))
  };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withAuth(SingleStudent));
