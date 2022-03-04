import React, { useEffect, useState } from "react";
import withAuth from "../utils/protectRoute";
import StudentAttendance from "../Components/StudentOverviewComponents/StudentAttendance";
import { Row, Col, Select, Button } from "antd";
import { connect } from "react-redux";
import { parentGetMeAction } from "../store/ParentGetMe/parentGetMeAction";
import { studentAttendanceDetail } from "../store/AdminAttendance/AdminAttendanceAction";
import { getSingleStudentAttendance } from "../store";

function parentAttendancePage({
  parentData,
  studentAttendanceDetail,
  parentGetMe,
  singleStudentAttendanceLoading,
  singleStudentAttendanceError,
}) {
  const [childNo, setChildNo] = useState("");
  const [childId, setChildId] = useState([]);
  const [initChild, setInitChild] = useState('');
  useEffect(() => {
    parentGetMe();
    
  }, []);

  useEffect(() => {
    parentData.data ? setChildNo(parentData.data.children.rows[0].uuid) : null;
    parentData.data ? studentAttendanceDetail(parentData.data.children.rows[0].uuid) : null;
    parentData.data ? setInitChild(`${parentData.data.children.rows[0].firstName} ${parentData.data.children.rows[0].lastName}`) : null;
  }, [parentData])

  console.log("parentt", parentData.data ? parentData.data.children : "");

  var child = [];
  // var childId = parentData.data ? parentData.data.children.rows[0].uuid : "";
  var childs = [];
  
  parentData.data
    ? parentData.data.children.rows.forEach((element) => {
        childs.push(element.uuid);
        child.push({
          childName: `${element.firstName} ${element.lastName}`,
          childId: element.uuid,
        });
      })
    : null;

  console.log("child", child);
  return (
    <div>
      <div style={{
        width: "80vw",
        margin: "auto auto",
        padding: "20px",
      }}>
        <h1>View Your Child's Attendance</h1>
      </div>
      <Col span={24}>
        <Row>
          <Col
            xs={24}
            xl={24}
            style={{
              marginRight: "5px",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
            className="gutter-row"
          >
            <Select
              style={{ width: "100%", marginBottom: "2px" }}
              value={initChild}
              onChange={(value) => {
                console.log('VALUE', value);
                setChildId(value);
                studentAttendanceDetail(value);
                if(parentData.data) {
                  var childSel;
                  parentData.data.children.rows.forEach((child) => child.uuid === value ?  childSel = child : null);
                  var selectedChild = `${childSel.firstName} ${childSel.lastName}`
                  setInitChild(selectedChild)
                }
                // setChildNo(0)
              }}
              placeholder="Select Child"
            >
              {/* <Select.Option value={1} key={1}></Select.Option>
               <Select.Option value={2} key={2}></Select.Option> */}

              {child.map((cl) => (
                <Select.Option value={cl.childId} key={cl.childName}>
                  {cl.childName}
                </Select.Option>
              ))}
            </Select>
          </Col>
          {/* <Col
            xs={6}
            xl={6}
            style={{
              marginRight: "5px",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
            className="gutter-row"
          >
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "2px",
              }}
              onClick={() => {
                studentAttendanceDetail(childId);
                console.log(childId);
              }}
              // htmlType="submit"
              loading={singleStudentAttendanceLoading}
              error={singleStudentAttendanceError}
              // disabled={!section}
            >
              View Attendance
            </Button>
          </Col> */}
        </Row>
      </Col>

      <StudentAttendance
        fromParent={true}
        studId={childId[0]}
        studentAttendance={[{ year: "2020", month: "02", day: 15 }]}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    parentData: state.parentGetMe.parent,
    loading: state.parentGetMe.loading,
    error: state.parentGetMe.error,
    
    singleStudentAttendance: state.adminAttendanceReducer,
    singleStudentAttendanceLoading: state.adminAttendanceReducer.loading,
    singleStudentAttendanceError: state.adminAttendanceReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    parentGetMe: () => dispatch(parentGetMeAction()),
    studentAttendanceDetail: (studId) =>
      dispatch(studentAttendanceDetail(studId)),

    // loadingFalse: () => dispatch(loadingFalse()),
    // loadingTrue: () => dispatch(loadingTrue()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(parentAttendancePage));
