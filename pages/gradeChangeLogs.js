import React, { useEffect } from "react";
import withAuth from "../utils/protectRoute";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { connect } from "react-redux";
import { changeLogsAction } from "../store/ChangeLogs/changeLogsAction";
import { primary_color } from "../utils/constants";
import GradeChangeLog from "../Components/ChangeLogsComponents/gradeChangeLog";
function GradeChangeLogs({ changeLogsAction, changeLogs, loading, error }) {
  const { Panel } = Collapse;
  var changeLogsArray = [];

  useEffect(() => {
    changeLogsAction();
  }, []);

  for (let i = 0; i < changeLogs.length; i++) {
    changeLogsArray.push(
      <Panel
        header={
          changeLogs[i].resultInformation.studentInformation.firstName +
          " " +
          changeLogs[i].resultInformation.studentInformation.lastName
        }
        key={i}
        className="site-collapse-custom-panel"
      >
        <GradeChangeLog
          assessmentName={
            changeLogs[i].resultInformation.assessmentInformation.name
          }
          createdAt={changeLogs[i].createdAt}
          updatedAt={changeLogs[i].updatedAt}
          grade={
            changeLogs[i].resultInformation.studentInformation.class.grade +
            changeLogs[i].resultInformation.studentInformation.class.section
          }
          subject=""
          previousValue={changeLogs[i].previous}
          newValue={changeLogs[i].new}
          whoChanged={changeLogs[i].userInformation.name}
          reason={changeLogs[i].comment}
        />
      </Panel>
    );
  }

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: primary_color,
          marginTop: "20px",
          marginBottom: "20px",
          paddingRight: "120px",
        }}
      >
        All Mark Change Logs
      </h2>
      <Collapse
        bordered={false}
        defaultActiveKey={["0"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {changeLogsArray}
      </Collapse>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    changeLogs: state.changeLogs.changeLogs,
    loading: state.changeLogs.loading,
    error: state.changeLogs.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogsAction: () => dispatch(changeLogsAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(GradeChangeLogs));
