import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import withAuth from "../utils/protectRoute";
import { Row, Col, Select } from "antd";
import { parentGetMeAction } from "../store/ParentGetMe/parentGetMeAction";
import SingleReportCard from "../Components/ReportCard/SingleReportCard";

function parentReportCard({ parentData, parentGetMe, loading, error }) {
    const [childNo, setChildNo] = useState("");
    const [childId, setChildId] = useState([]);
    const [initChild, setInitChild] = useState('');
    const [childSelectedInfo, setChildSelectedInfo] = useState({});
    useEffect(() => {
        parentGetMe();
        
      }, []);
    
    useEffect(() => {
        parentData.data ? setChildNo(parentData.data.children.rows[0].uuid) : null;
        
        parentData.data ? setChildSelectedInfo(parentData.data.children.rows[0]) : null;
        parentData.data ? setInitChild(`${parentData.data.children.rows[0].firstName} ${parentData.data.children.rows[0].lastName}`) : null;
      }, [parentData])
    
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

console.log('ooooo', childSelectedInfo)

  return <div>
      <div style={{
        width: "80vw",
        margin: "auto auto",
        padding: "20px",
      }}>
        <h1>View Your Child's Report Card</h1>
      </div>
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
                setChildId(value);
                // studentAttendanceDetail(value);
                if(parentData.data) {
                    var childSel;
                    parentData.data.children.rows.forEach((child) => child.uuid === value ?  childSel = child : null);
                    var selectedChild = `${childSel.firstName} ${childSel.lastName}`
                    setInitChild(selectedChild)
                    setChildSelectedInfo(childSel);
                  }
              }}
              placeholder="Select Child"
            >
              {child.map((cl) => (
                <Select.Option value={cl.childId} key={cl.childName}>
                  {cl.childName}
                </Select.Option>
              ))}
            </Select>
          </Col>
          {childSelectedInfo.hasOwnProperty('firstName') ? <SingleReportCard student={childSelectedInfo}/> : <div></div>}
  </div>;
}

const mapStateToProps = (state) => {
  return {
    parentData: state.parentGetMe.parent,
    loading: state.parentGetMe.loading,
    error: state.parentGetMe.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    parentGetMe: () => dispatch(parentGetMeAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(parentReportCard));
