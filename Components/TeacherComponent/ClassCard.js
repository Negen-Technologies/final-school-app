import { Col, Row } from "antd";
import React from "react";

export default function ClassCard({ grade, col, subject, width,hight }) {
  return (
    <div>
      <div>
        <Row
          style={{
            border: `2px solid ${col}`,
            width: `${width ? width : "120px"}`,
            hight: `${hight ? hight : "120px"}`,
          }}
        >
          <Col>
            <div
              style={{
                width: "30px",
                backgroundColor: col,
                color: "light gray",
                fontSize: "20px",
                margin: "0",
                textAlign: "center",
                paddingRight:"20px",
              
              }}
            >
              {grade}
            </div>
          </Col>
          <Col flex={1}>
            <div
              style={{
                backgroundColor: "light gray",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                paddingTop: "7px",
                textAlign: "center",
                margin: "0",
                
              }}
            >
              {subject}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
