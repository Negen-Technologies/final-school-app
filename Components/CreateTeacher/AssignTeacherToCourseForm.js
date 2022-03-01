import React,{useEffect} from "react";
import { connect } from "react-redux";
import { getClassList, loadingTrue } from "../../store";
import { Checkbox, Row, Col } from "antd";
function CreateTeacher({classList,
getClassLists}) {
    useEffect(() => {
            if (classList.length == 0) {
              loadingTrue();
              getClassLists();
            }
    }, [])
    console.log(classList);
  return (
    <>
      hfdisuh
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Row>
          <Col span={8}>
            <Checkbox value="A">A</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="B">B</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="C">C</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="D">D</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="E">E</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
      ,
      {/* <Row>
        <Col
          xs={24}
          sm={8}
          xl={4}
          style={{ marginRight: "5px" }}
          className="gutter-row"
        >
          <Select
            style={{ width: "100%", marginBottom: "2px" }}
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
        <Col
          xs={24}
          sm={8}
          xl={4}
          style={{ marginRight: "5px" }}
          className="gutter-row"
        >
          <Select
            style={{ width: "100%", marginBottom: "2px" }}
            value={section}
            onChange={handleSectionChange}
            placeholder="Select Section"
          >
            {sectionsList.map((sec) => (
              <Select.Option key={sec.key}>{sec.value}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col
          xs={24}
          sm={8}
          xl={4}
          style={{ marginRight: "5px" }}
          className="gutter-row"
        >
          <Select
            style={{ width: "100%", marginBottom: "2px" }}
            value={course}
            onChange={handleCourseChange}
            placeholder="Select Course"
          >
            {courseList.map((course) => (
              <Select.Option key={course.name}>{course.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={8} xl={4} style={{ marginRight: "5px" }}>
          <Button
            type="primary"
            style={{
              width: "100%",
              marginBottom: "2px",
            }}
            onClick={onFinish}
            htmlType="submit"
            loading={!isForGradeChange ? isPending : loading}
            error={error}
            disabled={!section}
          >
            Filter
          </Button>
        </Col>
      </Row> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    classList: state.classList.classes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassLists: () => dispatch(getClassList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeacher);