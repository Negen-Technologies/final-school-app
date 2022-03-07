import React from "react";
import { Card, Row, Col } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { primary_color } from "../../utils/constants";

export default function ChildrenDataCard(props) {
  return (
    <div>
      <Card
        hoverable={true}
        bordered={true}
        style={{
          width: "100%",
          height: "600",
          marginBottom: "10px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: `1px solid ${primary_color}`,
        }}
      >
        <Row
          style={{
            alignItems: "center",
          }}
          justify={"space-between"}
        >
          <Col>
            <Row
              style={{
                alignItems: "center",
              }}
            >
              <Avatar
                style={{
                  width: "80px",
                  height: "80px",
                  marginRight: "10px",
                }}
                src={props.url}
              ></Avatar>
              <p
                style={{
                  margin: "10px",
                  fontSize: 16,
                }}
              >
                {props.rank}
              </p>
              <p
                style={{
                  margin: "10px",
                  fontSize: 22,
                }}
              >
                {props.name}
              </p>
            </Row>
          </Col>
          <Col>
            <p
              style={{
                margin: "10px",
                fontSize: 16,
              }}
            >
              {props.average}
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
