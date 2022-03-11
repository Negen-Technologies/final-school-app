import React from "react";
import { Col, Row, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";

function StudentParentCard({ singleStudentInfo }) {
  const parentInfo = singleStudentInfo ? singleStudentInfo.info.parent : null;

  return (
    <div>
      <Row>
        <Col>
          <div
            style={{
              // width: "500px",
              paddingTop: "0",
              // border: "1px solid black",
              backgroundColor: "transparent",
              height: "100px",
            }}
          >
            <Row align="middle" style={{ height: "100%" }}>
              <Col
                style={{ padding: "10px" }}
                md={6}
                sm={6}
                xs={6}
                lg={6}
                xl={6}
              >
                <Avatar
                  style={{ width: "75px", height: "75px" }}
                  src="/sampleWoman.jpg"
                ></Avatar>
              </Col>
              <Col flex={1} md={12} sm={12} xs={12} lg={12} xl={12}>
                <div
                  style={{
                    // width: "100%",
                    height: "75px",
                  }}
                >
                  <Row>
                    <p
                      style={{
                        marginBottom: "0px",
                        fontSize: "20px",
                        fontWeight: 550,
                      }}
                    >
                      {parentInfo.name}
                    </p>
                  </Row>

                  <Row>
                    {" "}
                    <p
                      style={{
                        marginBottom: "5px",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      Phone :{parentInfo.phoneNumber}
                    </p>
                    <p
                      style={{
                        marginBottom: "5px",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      <span style={{paddingRight:"3px"}}>Email:</span>
                      {parentInfo.email}
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default StudentParentCard;
