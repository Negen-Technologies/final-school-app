import React from 'react'
import {Card, Row, Col} from 'antd'
function GradeChangeLog({subject, grade, assessmentName, createdAt, updatedAt, previousValue, newValue, whoChanged, reason}) {
    
  return (
      <div style={{
          margin: '20px'
      }}>
         <Card title={subject  + "  " + grade} bordered={false} style={{ 
        width: '70vw',
        borderRadius: '10',
        margin: 'auto'
        }}>
            <Row>
                <Col xs={12} sm={12} lg={12} xl={12} >
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{marginRight: '25px'}}>
                              <p style={{fontWeight: 'bolder'}}>Assessment Name: </p>
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6}>
                              <p>{assessmentName} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{marginRight: '25px'}}>
                              <p style={{fontWeight: 'bolder'}}>Previous Value: </p>
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6}>
                              <p>{previousValue} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{marginRight: '25px'}}>
                              <p style={{fontWeight: 'bolder'}}>Changed Value: </p>
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6}>
                              <p>{newValue}</p>
                        </Col>
                    </Row>

                </Col>
                <Col xs={12} sm={12} lg={12} xl={12}>
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{marginRight: '25px'}}>
                              <p style={{fontWeight: 'bolder'}}>Initially logged at: </p>
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6}>
                              <p>{createdAt}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{marginRight: '25px'}}>
                        <p style={{fontWeight: 'bolder'}}>Changed at: </p>
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6}>
                              <p>{updatedAt}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{marginRight: '25px'}}>
                        <p style={{fontWeight: 'bolder'}}>Who changed: </p>
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6}>
                              <p>{whoChanged}</p>
                        </Col>
                    </Row>
                </Col> 
            </Row>
            <Row>
                <Col xs={6} sm={6} lg={6} xl={6}>
                 <p style={{fontWeight: 'bolder'}}>Reason: </p>
                </Col>
                <Col xs={18} sm={18} lg={18} xl={18}> 
                   <p>{reason}</p>
                </Col>
            </Row>
            
     
      


    </Card> 
      </div>
    
  )
}

export default GradeChangeLog