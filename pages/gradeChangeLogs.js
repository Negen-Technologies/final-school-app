import React, { useEffect, useState } from "react";
import withAuth from "../utils/protectRoute";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Spin, Space, DatePicker } from "antd";
import { connect } from "react-redux";
import { changeLogsAction } from "../store/ChangeLogs/changeLogsAction";
import { primary_color } from "../utils/constants";
import GradeChangeLog from "../Components/ChangeLogsComponents/gradeChangeLog";
function GradeChangeLogs({ changeLogsAction, changeLogs }) {
  const { Panel } = Collapse;
  var changeLogsArray = [];
  const [searchString, setSearchString] = useState("");
  var filteredLogs = changeLogs.filter((logs) =>
    searchString === ""
      ? Date.parse(searchString) !== Date.parse(logs.updatedAt.split("T")[0])
      : Date.parse(searchString) === Date.parse(logs.updatedAt.split("T")[0])
  );
  useEffect(() => {
    changeLogsAction();
  }, []);


  for (let i = 0; i < filteredLogs.length; i++) {
    changeLogsArray.push(
      <Panel
        header={
          filteredLogs[i].resultInformation.studentInformation.firstName +
          " " +
          filteredLogs[i].resultInformation.studentInformation.lastName
        }
        key={i}
        className="site-collapse-custom-panel"
        style={{
          marginBottom: "10px",
        }}
      >
        <GradeChangeLog
          assessmentName={
            filteredLogs[i].resultInformation.assessmentInformation.name
          }
          createdAt={filteredLogs[i].createdAt}
          updatedAt={filteredLogs[i].updatedAt}
          grade={
            filteredLogs[i].resultInformation.studentInformation.class.grade +
            filteredLogs[i].resultInformation.studentInformation.class.section
          }
          subject=""
          previousValue={filteredLogs[i].previous}
          newValue={filteredLogs[i].new}
          whoChanged={filteredLogs[i].userInformation.name}
          reason={filteredLogs[i].comment}
        />
      </Panel>
    );
  }

  function onChange(date, dateString) {
    setSearchString(dateString);
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

      <Space direction="vertical">
        <DatePicker onChange={onChange} />
      </Space>
      {changeLogs.length > 0 ? (
        <div>
          {changeLogsArray.length > 0 ? (
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
          ) : (
            <div
              style={{
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "80vh",
              }}
            >
              <p>There are no changes uploaded on this day.</p>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "85vh",
          }}
        >
          <Spin size="large" />
        </div>
      )}
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
