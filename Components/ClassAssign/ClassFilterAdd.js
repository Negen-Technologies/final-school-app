import React, { useState } from "react";
import { Select, Row, Col, Button, Modal, Form } from "antd";
import { connect } from "react-redux";
import {
  assignClass,
  createClass,
} from "../../store/AssignClass/AssignClassAction";

const { Option } = Select;
const children = [];
const child = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

for (let i = 0; i < 14; i++) {
  children.push(
    <Select.Option key={i} value={child[i]}>
      {child[i]}
    </Select.Option>
  );
}

function ClassFilterAdd({
  students,
  isPending,
  teachersIsPending,
  requestingClass,
  creatingClass,
  error,
}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addStudentForm] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const formItemLayout = {
    wrapperCol: { span: 20, offset: 1 },
  };


  return (
    <div>
      <Col span={24}>
        <Row>
          <Col span={16}>
            <Form
              {...formItemLayout}
              name="class_filter"
              className="filter_class"
              initialValues={{
                remember: true,
              }}
              onFinish={(value) => {
                requestingClass(value.class.value, value.section);
              }}
              // onSubmit={handleSubmit}
            >
              <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }}>
                <Col span={6}>
                  <Form.Item name="class">
                    <Select
                      labelInValue
                      placeholder="Select Class"
                      style={{ width: "100%" }}
                      // onChange={handleSee}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item name="section">
                    <Select
                      placeholder="Select Section"
                      //   onChange={}

                      style={{ width: "100%" }}
                    >
                      <Select.Option value="A">A</Select.Option>
                      <Select.Option value="B">B</Select.Option>
                      <Select.Option value="C">C</Select.Option>
                      <Select.Option value="D">D</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    htmlType="submit"
                    loading={isPending}
                    // error={error}

                    // onClick={}
                  >
                    Filter
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col span={4}>
            <Button style={{ width: "100%" }} onClick={showModal}>
              Add Class
            </Button>
            <Modal
              title="Title"
              visible={visible}
              onOk={(handleOk, addStudentForm.submit)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              footer={[
                <Button
                  loading={isPending}
                  form="add_class"
                  type="primary"
                  key="submit"
                  style={{
                    width: 200,
                    marginLeft: "10px",
                  }}
                  htmlType="submit"
                >
                  Add
                </Button>,
              ]}
            >
              {/* <p>{modalText}</p> */}
              <div>
                <Form
                  form={addStudentForm}
                  // {...formItemLayout}
                  name="add_student"
                  className="student_add"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(value) => {
                    creatingClass(value.classToAdd.value, value.sectionToAdd);
                    // onRequestTeachers(value.classGrade);
                  }}
                  // onSubmit={handleSubmit}
                >
                  <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }}>
                    <Col className="gutter-row" span={12}>
                      <Form.Item
                        name="classToAdd"
                        style={{
                          width: "100%",
                          height: 60,
                          marginBottom: 0,
                          marginRight: 0,
                        }}
                      >
                        <Select
                          labelInValue
                          // mode="multiple"
                          placeholder="Select Class"

                          // onChange={handleChange}
                        >
                          {children}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <Form.Item
                        name="sectionToAdd"
                        style={{
                          width: "100%",
                          height: 60,
                          marginBottom: 0,
                          marginRight: 0,
                        }}
                      >
                        <Select placeholder="Select Section">
                          <Select.Option value="A">A</Select.Option>
                          <Select.Option value="B">B</Select.Option>
                          <Select.Option value="C">C</Select.Option>
                          <Select.Option value="D">D</Select.Option>
                          <Select.Option value="E">E</Select.Option>
                          <Select.Option value="F">F</Select.Option>
                          <Select.Option value="G">G</Select.Option>
                          <Select.Option value="H">H</Select.Option>
                          <Select.Option value="I">I</Select.Option>
                          <Select.Option value="J">J</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Modal>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // students: state.requestStudents.students,
    // isPending: state.requestStudents.isPending,
    // error: state.requestStudents.error,

    assignedTeachers: state.assignTeacher.teachers,
    assignedTeachersIsPending: state.assignTeacher.isPending,
    assignedTeachersIsError: state.assignTeacher.error,

    classes: state.createClass.classes,
    isPending: state.createClass.isPending,
    error: state.createClass.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onRequestStudents: (stdName, stdId, stdClass, stdSection) =>
    //   dispatch(requestStudents(stdName, stdId, stdClass, stdSection)),
    // onRequestTeachers: (classGrade) => dispatch(getTeachers(classGrade)),
    // to be called on finish
    requestingClass: (classGrade, classSection) =>
      dispatch(assignClass(classGrade, classSection)),
    creatingClass: (classGradeAdd, classSectionAdd) =>
      dispatch(createClass(classGradeAdd, classSectionAdd)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassFilterAdd);
