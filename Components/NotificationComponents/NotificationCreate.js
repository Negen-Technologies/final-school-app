import React from "react";
import { Button, Col, Divider, Input, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { SendOutlined } from "@ant-design/icons";

export default function NotificationCreate() {
  const [value, setValue] = React.useState([]);
  const [filter, setFilter] = React.useState("Students");
  const [loading, setLoading] = React.useState(false);
  const options = [];
  const filters = [
    { value: "Students", label: "Students" },
    { value: "Teachers", label: "Teachers" },
    { value: "Staff", label: "Staff" },
    { value: "Classes", label: "Classes" },
  ];
  var placeholder = loading ? "Loading..." : "Select student...";
  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
      label: `Lionel Messi: ${value}`,
      value,
    });
  }
  const selectProps = {
    size: "large",
    style: { width: "100%" },
    value: filter,
    options: filters,
    onChange: (newValue) => {
      setFilter(newValue);
    },
    placeholder: "Filter",
  };
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
      <Divider style={{ marginTop: 0 }} orientation="left">
        Recipients
      </Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Col xs={24} md={6} lg={6}>
            <Select {...selectProps} />
          </Col>
          <Col xs={24} md={18} lg={18}>
            <Select {...selectPropsSearch} />
          </Col>
        </Row>
      </Space>
      <Divider orientation="left">Title</Divider>
      <Input size="large" placeholder="Notification Title" />
      <Divider orientation="left">Body</Divider>
      <TextArea allowClear autoSize={{ minRows: 10 }} />
      <Row justify={"center"}>
        <Col xs={16} lg={12}>
          <Button
            size="large"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
            type="primary"
            icon={<SendOutlined />}
            block={true}
          >
            Send
          </Button>
        </Col>
      </Row>
    </div>
  );
}
