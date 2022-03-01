import { Col, Row } from "antd";
import React from "react";

export default function DaysLateCard({ label, col, day, width }) {
  return (
    <div>
      <div>
        <Row
          style={{
            border: `2px solid ${col}`,
            width: `${width ? width : "120px"}`,
          }}
        >
          <Col>
            <div
              style={{
                width: "30px",
                backgroundColor: col,
                color: "white",
                fontSize: "20px",
                margin: "0",
                textAlign: "center",
              }}
            >
              {day}
            </div>
          </Col>
          <Col flex={1}>
            <div
              style={{
                backgroundColor: "transparent",
                color: col,
                fontSize: "12px",
                fontWeight: "bold",
                paddingTop: "5px",
                textAlign: "center",
                margin: "0",
              }}
            >
              {label}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
