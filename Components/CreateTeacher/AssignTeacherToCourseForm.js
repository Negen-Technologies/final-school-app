import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getClassList } from "../../store";
import { Checkbox, Button, Select, Card, Tag, Divider, Row, Col } from "antd";

const { Option } = Select;
function CreateTeacher({ classList, getClassLists, classLoading,onSubmit,isLoading }) {
  const [courseInfo, setcourseInfo] = useState([]);
  const [selectedGrade, setselectedGrade] = useState(0);
  const [selectedCourses, setselectedCourses] = useState([]);
  const [selectedTags, setselectedTags] = useState([]);
  

  function getCourseInfo(arr, selected) {
    setcourseInfo([]);
    var filteredClasses = arr.filter((element) => {
      return element.grade === selected;
    });
    filteredClasses[0].coursesList.forEach((element) => {
      var singlecourseInfo = element.courseInformation;
      singlecourseInfo["courseId"] = element.courseId;
      setcourseInfo((courseInfo) => [...courseInfo, singlecourseInfo]);
    });
  }

  function generateOptions() {
    var optionsList = [];
    for (let index = 1; index <= 12; index++) {
      optionsList.push(
        <Option key={index} value={index}>
          {index}
        </Option>
      );
    }
    return optionsList;
  }

  function removeCourses(item) {
    const newData = [...selectedCourses];
    const index = newData.findIndex((ii) => item.courseId === ii.courseId);
    newData.splice(index, 1);
    setselectedCourses(newData);
  }

  function addCourses(item) {
    var newarr = [...selectedCourses];

    if (!newarr.some((e) => e.courseId == item.courseId)) {
      newarr.push(item);
    }
    setselectedCourses(newarr);
  }

  function generateTags() {
    var selectedT = [];
    selectedCourses.forEach((element) => {
      selectedT.push(
        <Tag
          closable
          key={element.courseId}
          color="geekblue"
          style={{
           marginBottom: "16px",
          }}
          onClose={() => {
            removeCourses(element.courseId);
          }}
        >
          {element.name + "-" + element.grade}
        </Tag>
      );
    });
    setselectedTags(selectedT);
  }
  function qualifiedCourses() {
    var qualifiedCoursesArr = [];
    selectedCourses.forEach((element) => {
      qualifiedCoursesArr.push(element.courseId);
    });
    return qualifiedCoursesArr;
  }
    
  

  useEffect(() => {
    getClassLists();
  }, []);

  useEffect(() => {
    if (selectedGrade > 0) getCourseInfo(classList, selectedGrade);
  }, [selectedGrade]);

  useEffect(() => {
    console.log(selectedCourses);
    generateTags();
  }, [selectedCourses]);

  return (
    <>
      <h2 style={{ marginBottom: "16px", marginTop: "16px", fontWeight: 400 }}>
        Select Qualified Courses
      </h2>
      <Card
        loading={classLoading}
        style={{
          // boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          border: "1px solid #e8e8e8",
        }}
      >
        <div>{selectedTags}</div>
        <Select
          placeholder="Select Class"
          onChange={(value) => {
            console.log(value);
            setselectedGrade(value);
          }}
          style={{ width: "200px" }}
        >
          {classList.length===0?<></>:generateOptions()}
        </Select>
        <Checkbox.Group style={{ width: "100%" }}>
          <Row>
            {courseInfo.map((element) => {
              return (
                <Col key={element.courseId} span={24}>
                  <Divider />
                  <input
                    type="checkbox"
                    name={element.name + "-" + element.grade}
                    value={element}
                    checked={selectedCourses.includes(element) ? true : false}
                    style={{ marginBottom: -20, marginRight: 15 }}
                    onChange={(event) => {
                      event.target.checked
                        ? addCourses(element)
                        : removeCourses(element);
                    }}
                  />
                  <label
                    htmlFor={element.name + "-" + element.grade}
                    style={{ marginBottom: 10 }}
                  >
                    {" "}
                    {element.name}
                  </label>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
        <div style={{ textAlign: "center" }}>
          {" "}
          <Button
            type="primary"
            style={{ marginTop: "25px" }}
            onClick={() => {
              onSubmit(qualifiedCourses());
            }}
            loading={isLoading}
            disabled={selectedCourses.length === 0 ? true : false}
          >
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    classList: state.classList.classes,
    classLoading: state.classList.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassLists: () => dispatch(getClassList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeacher);
