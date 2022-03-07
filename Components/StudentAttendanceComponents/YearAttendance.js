import React from 'react';
import { Row, Col, Divider, Card, Calendar } from "antd";
import moment from "moment";


function YearAttendace(){
  const now = moment();

    return (
      <div>
        <Divider orientation="left">
          <h1>ATTENDANCE</h1>
        </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div className="site-card-border-less-wrapper">
              <Card
                title="January 2021"
                bordered={false}
                style={{ width: 300 }}
              >
                <div className="site-calendar-demo-card">
                  <Calendar
                    headerRender={() => {}}
                    defaultValue
                    fullscreen={false}
                  />
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="site-card-border-less-wrapper">
              <Card
                title="Feburay 2021"
                bordered={false}
                style={{ width: 300 }}
              >
                <div className="site-calendar-demo-card">
                  <Calendar
                    headerRender={() => {}}
                    fullscreen={false}
                    defaultValue={null}
                  />
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="site-card-border-less-wrapper">
              <Card
                title="January 2021"
                bordered={false}
                style={{ width: 300 }}
              >
                <div className="site-calendar-demo-card">
                  <Calendar
                    headerRender={() => {}}
                    defaultValue
                    fullscreen={false}
                  />
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="site-card-border-less-wrapper">
              <Card
                title="January 2021"
                bordered={false}
                style={{ width: 300 }}
              >
                <div className="site-calendar-demo-card">
                  <Calendar
                    headerRender={() => {}}
                    defaultValue
                    fullscreen={false}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
        
      </div>
    );
}
export default YearAttendace;