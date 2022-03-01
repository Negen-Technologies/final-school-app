import React from "react";
import {
 Col,
  Row,
  Avatar
} from "antd";
import { EditOutlined } from "@ant-design/icons";
// import { StudentContext } from "../../utils/studentsContext";

function StudentParentCard({singleStudentInfo}) {

const parentInfo = singleStudentInfo ? singleStudentInfo.info.parent: null;
console.log('asdsdsdsd', singleStudentInfo)
  

  return (
    <div>
     
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
                          {parentInfo.name}
                        </p>
                      </Row>
              
            <Row>    <p
              style={{
                marginBottom: "20px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
             Phone :  (+251) {parentInfo.phoneNumber}
            </p>
           
          
            <p
              style={{
                marginBottom: "20px",
                fontWeight: 500,
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              Email : {parentInfo.email}
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
