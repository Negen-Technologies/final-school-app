
import React, { useState,useEffect } from "react";
import { Button, Col, DatePicker, Divider, Row, Select, Tabs } from "antd";



import StudentCard from "../Components/StudentOverviewComponents/StudentCard";
// import StudentBio from "../Components/StudentOverviewComponents/StudentBio";
// import NotificationsPagination from "../components/NotificationComponents/NotificationsPagination";
// import StudentOverview from "../components/StudentOverviewComponents/StudentOverview";
import StudentAttendance from "../Components/StudentOverviewComponents/StudentAttendance";
import {getSingleStudentAttendance}from "../store/index";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { useRouter } from 'next/router'
const { TabPane } = Tabs;

const ParentSingleChildPage = ({studentAttendanceAction,studentAttendance}) => {
  const [tab, setTab] = useState("1");
  const [display, setDisplay] = useState(false);
  const router = useRouter()
  const { studentid } = router.query


useEffect(() => {
  if (tab == 1 && studentAttendance.attendance.length == 0) {
    studentAttendanceAction(studentid);
  }
}, [tab]);

useEffect(() => {
  if (tab == 2 && studentAttendance.attendance.length == 0) {
    studentAttendanceAction(studentid);
  }
}, [tab]);

  function callback(key) {
    console.log(key);
    setTab(key)
  }
  const notifications = [
    {
      name: "Administrator, Liya",
      src: "/images/sampleWoman.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
    {
      name: "Staff, Messi",
      src: "/images/sampleMan.jpg",
      content:
        "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
    },
    {
      name: "Staff, Shady",
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
      {/* <StudentCard></StudentCard> */}
      {/* <Tabs
        style={{ marginTop: "5px" }}
        type="card"
        defaultActiveKey="1"
        onChange={callback}
      >
        <TabPane tab="Overview" key="1">
          <StudentOverview studentAttendance={studentAttendance}></StudentOverview>
        </TabPane>
        <TabPane tab="Bio" key="2">
          <StudentBio />
        </TabPane>
        <TabPane tab="Notification" key="3">
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
              >
                Create Notification
              </Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Attendance" key="4">
          <StudentAttendance studentAttendance={studentAttendance}></StudentAttendance>
        </TabPane>
        <TabPane tab="Report-Card" key="5">
          Report Card
        </TabPane>
        <TabPane tab="Records" key="6">
          Record
        </TabPane>
        <TabPane tab="Transcript" key="7">
          Transcript
        </TabPane>
      </Tabs> */}
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    studentAttendance: state.singleStudentAttendance,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    studentAttendanceAction: (id) => dispatch(getSingleStudentAttendance(id)),
  };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withAuth(ParentSingleChildPage));
