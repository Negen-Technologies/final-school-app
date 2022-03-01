import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Select, Slider } from "antd";
import React from "react";

export default function NotificationFilter({ classes }) {
  const filterList = ["recipient", "writter"];
  const [filterBy, setFterBy] = React.useState(filterList[0]);
  const classList = classes;
  const gradeList = classList.map((value) => value.grade);
  const [gradeSelected, setGradeSelected] = React.useState(classList[0].grade);
  const [sectionSelected, setSectionSelected] = React.useState(
    classList[0].sections[0]
  );
  const [value, setValue] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const options = [];
  var placeholder = loading ? "Loading..." : "Select student...";
  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
      label: `Lionel Messi: ${value}`,
      value,
    });
  }
  const selectPropsSearch = {
    loading,
    size: "large",
    mode: "multiple",
    style: { width: "100%" },
    value,
    options,
    disabled: loading,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder,
    maxTagCount: "responsive",
    allowClear: true,
    filterOption: (inputValue, data) =>
      data.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
  };

  return (
    <div>
      <Divider orientation="center">Filter by</Divider>
      <Row
        justify="space-between"
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          width: "100%",
        }}
      >
        <Col style={{ paddingBottom: "10px" }} xs={24} md={11} lg={24} xl={11}>
          <Button
            style={
              filterBy === filterList[1]
                ? { width: "100%" }
                : { width: "100%", backgroundColor: "transparent" }
            }
            type={filterBy === filterList[1] ? "primary" : ""}
            onClick={() => setFterBy(filterList[1])}
            size="large"
          >
            Notification Writter
          </Button>
        </Col>

        <Col style={{ paddingBottom: "10px" }} xs={24} md={11} lg={24} xl={11}>
          <Button
            style={
              filterBy === filterList[0]
                ? { width: "100%" }
                : { width: "100%", backgroundColor: "transparent" }
            }
            type={filterBy === filterList[0] ? "primary" : ""}
            onClick={() => setFterBy(filterList[0])}
            size="large"
          >
            Notification Recipant
          </Button>
        </Col>
      </Row>
      <Divider orientation="center">Class</Divider>
      <div style={{ width: "100%" }}>
        <Slider
          min={0}
          max={classList.length}
          value={classList.findIndex((value) => value.grade == gradeSelected)}
          onChange={(index) => {
            setGradeSelected(gradeList[index]);
            setSectionSelected(
              classList.find((value, i) => value.grade == gradeList[index])
                .sections[0]
            );
          }}
          marks={gradeList}
          step={null}
          tipFormatter={(value) => gradeList[value]}
        />
      </div>
      <Row
        justify="space-between"
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          paddingTop: "10px",
          width: "100%",
        }}
      >
        {classList.find((value) => value.grade === gradeSelected).sections
          .length <= 4 ? (
          classList
            .find((value) => value.grade === gradeSelected)
            .sections.map((x, i) => (
              <Col
                style={{ paddingBottom: "10px" }}
                xs={24}
                sm={11}
                lg={24}
                xl={11}
                key={i}
              >
                <Button
                  style={
                    sectionSelected == x
                      ? { width: "100%" }
                      : { width: "100%", backgroundColor: "transparent" }
                  }
                  type={sectionSelected == x ? "primary" : ""}
                  onClick={() => {
                    setSectionSelected(x);
                  }}
                  size="large"
                >
                  Section {x}
                </Button>
              </Col>
            ))
        ) : (
          <Select
            size="large"
            style={{ width: "100%" }}
            value={sectionSelected}
            options={classList
              .find((value) => value.grade === gradeSelected)
              .sections.map((section) => {
                return { label: `Section ${section}`, value: section };
              })}
            onChange={(newValue) => {
              setSectionSelected(newValue);
            }}
            placeholder="Select Section"
          />
        )}
      </Row>
      <Divider orientation="left">Specific Student</Divider>
      <Select {...selectPropsSearch} />
      <Row justify="center">
        <Button
          size="large"
          type="primary"
          icon={<SearchOutlined size="large" />}
          style={{
            width: "50%",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          block={true}
        >
          Search
        </Button>
      </Row>
    </div>
  );
}
