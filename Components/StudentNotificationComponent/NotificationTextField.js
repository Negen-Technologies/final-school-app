import React, { useState } from 'react';
import { Button, Card } from 'antd'
import { Input, Space, Form } from "antd";
// import {  } from "@ant-design/icons";
import { AutoComplete } from 'antd';
const { TextArea } = Input;
const { Search } = Input;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Complete = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
};

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };


  const onChange = (data) => {
    setValue(data);
  };
  const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const prefixSelector = {};
function NotificationTextField() {
    return (
      <Form>
        <Form.Item name="prefix" noStyle>
          <Input>
            <AutoComplete
              // options={options}
              style={{ width: 200 }}
              onSearch={onSearch}
              placeholder="search here"
              prefix="TO:"
            />
          </Input>
        </Form.Item>

        <Form.Item>
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="success" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    );
};

export default NotificationTextField;
