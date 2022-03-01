import React from 'react'
import { Col, Row, Input, Button } from 'antd';

function GradeChangeStudentFilter() {
    return (
        <div>
      <Col span={24}>
        <div
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {/* {error} */}
        </div>
        <Row>
          <Col style={{ marginRight: "5px" }} className="gutter-row">
            <Input
              style={{ width: 220, marginBottom: "2px" }}
              onChange={(value) => handleClassChange(value)}
              placeholder="Enter student id"
            >
            </Input>
          </Col>
          
          <Col style={{ marginRight: "5px" }}>
            <Button
              type="primary"
              style={{
                width: 220,
                marginBottom: "2px",
              }}
            //   onClick={onFinish}
              htmlType="submit"
            //   loading={isPending}
            //   error={error}
            //   disabled={!section}
            >
              Get
            </Button>
          </Col>
        </Row>
      </Col>
    </div>
    )
}

export default GradeChangeStudentFilter
