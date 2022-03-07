import { PlusCircleFilled } from "@ant-design/icons";
import { Select, Row, Col, Modal, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassList,
  loadingTrue,
  createClass,
  setFilter,
  clearCreateClass,
} from "../../store";
import { getAClass } from "../../store/ClassList/ClassListAction";
import { requestStudents } from "../../store/StudentFilter/StudentFilterAction";

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

function StudentsFilterCriteria({
  min = false,
  add = true,
  isPending,
  error,
  onRequestStudents,
  classList,
  loadingTrue,
  getClassList,
  setFilter,
  token,
  createClass,
  creatingClass,
  clearCreateClass,
  getAClass,
}) {
  useEffect(() => {
    if (classList.length == 0) {
      loadingTrue();
      getClassList(token);
    }
  }, []);

  const [sectionsList, setSectionsList] = useState([]);
  const [section, setSection] = useState();
  const [grade, setGrade] = useState();
  const [createSection, setCreateSection] = useState();
  const [createGrade, setCreateGrade] = useState();
  const classes = [];
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addStudentForm] = Form.useForm();

  const showModal = () => {
    clearCreateClass();
    setVisible(true);
  };

  useEffect(() => {
    setFilter({ section, grade });
  }, [section, grade]);

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

  classList.forEach((element) => {
    const cl = classes.findIndex((c) => c.grade == element.grade);
    if (cl > -1) {
      classes[cl].sections = [
        ...classes[cl].sections,
        { value: element.section, key: element.section },
      ];
    } else {
      classes.push({
        key: element.uuid,
        grade: element.grade,
        sections: [{ value: element.section, key: element.section }],
      });
    }
  });

  const handleClassChange = (value) => {
    const i = classes.findIndex((c) => c.grade == value);
    setSectionsList(classes[i].sections);
    setGrade(classes[i].grade);
    setSection(classes[i].sections[0].value);
  };

  const handleSectionChange = (value) => {
    setSection(value);
  };

  const handleCreateGradeChange = (value) => {
    setCreateGrade(value);
  };

  const handleCreateSectionChange = (value) => {
    setCreateSection(value);
  };

  const onFinish = () => {
    const cl = classList.find((c) => c.grade == grade && c.section == section);
    onRequestStudents(cl.uuid);
    getAClass(cl.uuid);
  };

  const onCreateClass = () => {
    creatingClass(createGrade.value, createSection);
  };
  return min ? (
    <div>
      <Col span={24}>
        <div
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </div>
        <Row>
          <Col style={{ marginRight: "5px" }} className="gutter-row">
            <Select
              style={{ width: 232, marginBottom: "2px" }}
              onChange={(value) => handleClassChange(value)}
              placeholder="Select Class"
            >
              {classes.map((cl) => (
                <Select.Option value={cl.grade} key={cl.grade}>
                  {cl.grade}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col style={{ marginRight: "0px" }} className="gutter-row">
            <Select
              style={{ width: 232, marginBottom: "2px" }}
              value={section}
              onChange={handleSectionChange}
              placeholder="Select Section"
            >
              {sectionsList.map((sec) => (
                <Select.Option key={sec.key}>{sec.value}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Col>
    </div>
  ) : (
    <div>
      <Col span={24}>
        <div
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </div>
        <Row>
          <Col style={{ marginRight: "5px" }} className="gutter-row">
            <Select
              style={{ width: 220, marginBottom: "2px" }}
              onChange={(value) => handleClassChange(value)}
              placeholder="Select Class"
            >
              {classes.map((cl) => (
                <Select.Option value={cl.grade} key={cl.grade}>
                  {cl.grade}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col style={{ marginRight: "5px" }} className="gutter-row">
            <Select
              style={{ width: 220, marginBottom: "2px" }}
              value={section}
              onChange={handleSectionChange}
              placeholder="Select Section"
            >
              {sectionsList.map((sec) => (
                <Select.Option key={sec.key}>{sec.value}</Select.Option>
              ))}
            </Select>
          </Col>
          <Col style={{ marginRight: "5px" }}>
            <Button
              type="primary"
              style={{
                width: 220,
                marginBottom: "2px",
              }}
              onClick={onFinish}
              htmlType="submit"
              loading={isPending}
              error={error}
              disabled={!section}
            >
              Filter
            </Button>
          </Col>
          <Col style={{ margin: "auto auto" }}>
            {add ? (
              <Button
                type="primary"
                onClick={showModal}
                icon={<PlusCircleFilled />}
              >
                Add Class
              </Button>
            ) : null}

            <Modal
              title="Title"
              visible={visible}
              onOk={(handleOk, addStudentForm.submit)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              footer={[
                <Button
                  loading={createClass.isPending}
                  form="add_class"
                  type="primary"
                  key="submit"
                  style={{
                    width: 200,
                    marginLeft: "10px",
                  }}
                  disabled={!createSection || !createGrade}
                  onClick={onCreateClass}
                >
                  Add
                </Button>,
              ]}
            >
              <div>
                {createClass.error ? (
                  <div
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginBottom: "15px",
                    }}
                  >
                    {createClass.error[0] === "V"
                      ? "Class already exists"
                      : createClass.error}
                  </div>
                ) : (
                  ""
                )}
                {createClass.success ? (
                  <div
                    style={{
                      color: "green",
                      textAlign: "center",
                      marginBottom: "15px",
                    }}
                  >
                    {createClass.success}
                  </div>
                ) : (
                  ""
                )}
                <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }}>
                  <Col
                    style={{
                      width: "50%",
                      marginBottom: 0,
                      marginRight: 0,
                    }}
                    className="gutter-row"
                  >
                    <Select
                      style={{ width: "100%" }}
                      labelInValue
                      placeholder="Select Class"
                      value={createGrade}
                      onChange={handleCreateGradeChange}
                    >
                      {children}
                    </Select>
                  </Col>
                  <Col
                    style={{
                      width: "50%",
                      marginBottom: 0,
                      marginRight: 0,
                    }}
                    className="gutter-row"
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Section"
                      value={createSection}
                      onChange={handleCreateSectionChange}
                    >
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
                  </Col>
                </Row>
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
    students: state.requestStudents.students,
    isPending: state.requestStudents.isPending,
    error: state.requestStudents.error,
    classList: state.classList.classes,
    token: state.auth.token,
    createClass: state.createClass,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestStudents: (stdName, stdId, stdClass, stdSection) =>
      dispatch(requestStudents(stdName, stdId, stdClass, stdSection)),
    getClassList: (token) => dispatch(getClassList(token)),
    loadingTrue: () => dispatch(loadingTrue()),
    requestingClass: (classGrade, classSection) =>
      dispatch(assignClass(classGrade, classSection)),
    creatingClass: (classGradeAdd, classSectionAdd) =>
      dispatch(createClass(classGradeAdd, classSectionAdd)),
    setFilter: (filter) => dispatch(setFilter(filter)),
    clearCreateClass: () => dispatch(clearCreateClass()),
    getAClass: (id) => dispatch(getAClass(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsFilterCriteria);
