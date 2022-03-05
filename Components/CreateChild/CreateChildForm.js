import React, { useState, useEffect } from "react";
import { Input, Form, Row, Button, Col, Select, List, Avatar } from "antd";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

function CreateChildForm({ onError, createChild, onDone, onFinish }) {
  var { createdChild } = createChild;
  const [form] = Form.useForm();
  const [showForm, setshowForm] = useState(true);
  const [createdChildren, setcreatedChildren] = useState([]);
  var OptionsList = [];
  for (let index = 1; index < 13; index++) {
    OptionsList.push(
      <Select.Option key={index} value={index}>
        {index}
      </Select.Option>
    );
  }

  useEffect(() => {
    if (createdChild.data !== undefined) {
      console.log("NEW CHILD CREATED");
      if (!createdChildren.includes(createdChild.data.data))
      {
         setshowForm(false);
        setcreatedChildren((createdChildren) => [
          ...createdChildren,
          createdChild.data.data,
        ]);
      }
    }
  }, [createChild]);

  //CREATE A LIST TO SHOW CREATED CHILDREN AND A BUTTON TO ADD ANOTHER CHILD AND FINISH THE PROCESS

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        {" "}
        {createdChildren.length === 0 ? (
          <></>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={createdChildren}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.sex === "Male"
                          ? "/randomboy.png"
                          : "/randomgirl.png"
                      }
                    />
                  }
                  title={<p>{item.firstName + " " + item.lastName}</p>}
                />
              </List.Item>
            )}
          />
        )}
        {!showForm ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setshowForm(true);
              }}
              icon={<PlusOutlined />}
              type="primary"
            >
              Add Child
            </Button>
            <Button
              onClick={() => {
                var children = [...createdChildren];
                onDone(children);
                setcreatedChildren([]);
              }}
              style={{ marginLeft: "10px" }}
              type="default"
            >
              Done
            </Button>
          </div>
        ) : (
          <></>
        )}
        <Row>
          <Col span={6} push={11}></Col>
        </Row>
      </div>

      {showForm ? (
        <div style={{ marginTop: "5%" }}>
          <Form
            size="large"
            form={form}
            // labelCol={{ span: 4 }}
            onFinish={(values) => {
              onFinish(values);
            }}
            wrapperCol={{
              xs: { span: 20, offset: 1 },
              sm: { span: 20, offset: 3 },
              md: { span: 20, offset: 4 },
              lg: { span: 20, offset: 2 },
              xl: { span: 20, offset: 2 },
            }}
          >
            <Form.Item name="name">
              <Row>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>

                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="age"
              type="number"
              rules={[{ required: true, message: "Missing Age" }]}
            >
              <Input placeholder="Age" />
            </Form.Item>

            <Form.Item
              name="sex"
              rules={[{ required: true, message: "Enter Gender" }]}
            >
              <Select
                labelInValue
                placeholder="Select Gender"
                style={{ width: "100%" }}
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="grade"
              rules={[{ required: true, message: "Select Grade" }]}
            >
              <Select
                labelInValue
                placeholder="Select Grade"
                style={{ width: "100%" }}
              >
                {OptionsList}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginLeft: 30 }}
                error={onError}
                loading={createChild.isPending}
              >
                Submit
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    createChild: state.createChild,
    createChildIsPending: state.createUser.isPending,
    createChildError: state.createUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChildForm);
