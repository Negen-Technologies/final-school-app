import React, {useState} from 'react'
import {Modal} from 'antd'
import { Form, Input, Button, Row,
  Col } from 'antd';

import { PhoneOutlined } from '@ant-design/icons';

function ForgotPasswordModal({ isVisible }) {
  console.log("IS VISIBLE: " +isVisible)
    const [isModalVisible, setIsModalVisible] = useState(isVisible);
   

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleOk = () => {
      setIsModalVisible(false);
    };
    
    const handleCancel = () => {
      setIsModalVisible(false);
    };




return (
        <div>

          

    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <Form
name="normal_login"
className="login-form"

size='large'

>
  <div>Phone</div>
<Form.Item
  name="email"
  rules={[
    {
    type: 'string',
    message: 'The input is not valid E-mail!',
    },
    {
    required: true,
    message: 'Please input your E-mail!',
    },
    ]}
>
  <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone" />
</Form.Item>
</Form>
    </Modal>


        </div>
    )
}

export default ForgotPasswordModal
