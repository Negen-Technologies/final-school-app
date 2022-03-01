import React from "react";
import { Col, Row } from "antd";
import StudentParentCard from "../StudentBioComponents/StudentParentCard";
import StudentInfoCard from "../StudentBioComponents/StudentInfoCard";
import StudentImageCard from "../StudentBioComponents/StudentImageCard";
function StudentBio({ singleStudentInfo }) {
  var info = singleStudentInfo.info;
  return (
    <div>
      <Row span={8}>
        <Col
          span={8}
          xl={8}
          lg={12}
          md={12}
          sm={12}
          xs={24}
          style={{
            marginBottom: "10px",
          }}
        >
          <StudentImageCard />
        </Col>

        <Col
          span={8}
          xl={8}
          lg={12}
          md={12}
          sm={16}
          xs={24}
          style={{
            marginBottom: "10px",
          }}
        >
          <StudentInfoCard info={info}/>
        </Col>

        <Col
          span={8}
          xl={8}
          lg={12}
          md={12}
          sm={16}
          xs={24}
          style={{
            marginBottom: "10px",
          }}
        >
          <StudentParentCard />
        </Col>
      </Row>
    </div>
  );
}
export default StudentBio;
