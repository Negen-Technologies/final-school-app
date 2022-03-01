
import { Button, Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import StudentParentCard from "../StudentBioComponents/StudentParentCard"

export default function StudentCard({ singleStudentInfo }) {
  var info=singleStudentInfo.info
    console.log('ffffff', singleStudentInfo)
  return (
    <div>
      {singleStudentInfo.loading || singleStudentInfo.error ||info==null ? (
        <div></div>
      ) : (
        <div style={{
          backgroundColor: '#ffffff',
          marginTop: '10px'
        }}>
          <Row>
            <Col>
              <div
                style={{
                  width: "500px",
                  paddingTop: "0",
                  //border: "1px solid black",
                  backgroundColor: "transparent",
                  height: "100px",
                }}
              >
                <Row align="middle" style={{ height: "100%" }}>
                  <Col style={{ padding: "10px" }}>
                    <Avatar
                      style={{ width: "75px", height: "75px" }}
                      src="/sampleWoman.jpg"
                    ></Avatar>
                  </Col>
                  <Col flex={1}>
                    <div
                      style={{
                        width: "100%",
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
                          {info.firstName} {info.lastName}
                        </p>
                      </Row>
                      <Row>
                        <p style={{ marginBottom: "0px", fontWeight: 500 }}>
                          Grade : {info.class != null ? info.class.grade : "Unassigned"}
                        </p>
                        <p
                          style={{
                            marginBottom: "0px",
                            fontWeight: 500,
                            marginLeft: "10px",
                          }}
                        >
                          Section : {info.class != null ? info.class.section : "Unassigned"}
                        </p>
                      </Row>
                     
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <div
              style={{
                height: "100px",
                width: "2px",
                borderRadius: "50px",
                backgroundColor: "grey",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            ></div>
            <Col flex={1}>
              <div style={{ width: "100%", height: "100%" }}>
                <StudentParentCard singleStudentInfo = {singleStudentInfo} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
