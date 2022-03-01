import React from 'react';
import { Card, Col, Row } from "antd";
function AttendanceCard(){

return (
  <div className="site-card-wrapper">
    <Row gutter={20}>
      <Col span={4}>
        <Card
          hoverable={false}
          // bordered={false}
          size="small"
          style={{
            backgroundColor: "lightgreen",
            height: 60,
            paddingBottom: 20,
            alignItems: "center",
          }}
          // title={<div style={{fontWeight:'bold',fontSize:24}}>78</div>}
          // extra={'Days Absent'}
        >
          <Row>
            <Col span={8} >
              <div>
                <h1>15</h1>
              </div>
            </Col>
            <Col span={16}>
              <p>Days Absent</p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={4}>
        <Card
          size="small"
          hoverable={false}
          style={{
            backgroundColor: "lightgreen",
            height: 60,
            paddingBottom: 20,
            alignItems: "center",
          }}
        >
          <Row>
            <Col span={8}>
              <div>
                <h1>15</h1>
              </div>
            </Col>
            <Col span={16}>
              <div>Days Absent</div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
);
};
export default AttendanceCard;
