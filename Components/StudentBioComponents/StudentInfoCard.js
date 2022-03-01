import React, { useState ,useContext,useEffect} from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import {StudentContext} from "../../utils/studentsContext"
import { EditOutlined } from "@ant-design/icons";
function StudentInfoCard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initiatehide, setinitiatehide] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if(isModalVisible){
      if (initiatehide) {
        if(!singleStudentInfo.loading){
          setIsModalVisible(false)
          setinitiatehide(false)
        }
      }
    }
  }, [initiatehide]);

const { singleStudentInfo,updateSingleStudentInfo } = useContext(StudentContext);

const info=singleStudentInfo.info

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {info == null ? (
        <div></div>
      ) : (
        <div>
          <Modal
            title="Edit Student Info"
            visible={isModalVisible}
            closable={true}
            onCancel={handleCancel}
            maskClosable={false}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <Form
              name="student_edit"
              form={form}
              onFinish={(values) => {
                setinitiatehide(true);
                values["id"] = info.uuid;
                updateSingleStudentInfo(values);
              }}
              requiredMark={false}
            >
              <div>First Name:</div>
              <Form.Item
                name="fName"
                rules={[{ required: true, message: "First Name is required!" }]}
              >
                <Input />
              </Form.Item>
              <div>Last Name:</div>

              <Form.Item
                name="lName"
                rules={[{ required: true, message: "Last Name is required!" }]}
              >
                <Input />
              </Form.Item>
              {/* <div>Phone:</div>
          <Form.Item
            name="Phone"
            rules={[{ required: true, message: "Phone is required!" }]}
          >
            <Input />
          </Form.Item> */}
              <Row>
                <Col>
                  <div>Grade:</div>
                  <Form.Item
                    name="grade"
                    rules={[{ required: true, message: "Grade is required!" }]}
                  >
                    <Input placeholder="grade" disabled={true} />
                  </Form.Item>
                </Col>
                <Col style={{ marginLeft: "10px" }}>
                  <div>Section:</div>
                  <Form.Item
                    name="section"
                    rules={[
                      { required: true, message: "Section is required!" },
                    ]}
                  >
                    <Input placeholder="Section" disabled={true} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item /*{...tailLayout}*/
                style={{ float: "right", marginBottom: "20px" }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginLeft: "10px" }}
                  loading={singleStudentInfo.loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Card
            style={{
              width: "350px",
            }}
          >
            <Space align="end" size="large">
              <div
                style={{
                  width: "250px",
                  height: "280px",
                }}
              >
                <p
                  style={{
                    marginBottom: "10px",
                    fontWeight: 700,
                    fontSize: "25px",
                  }}
                >
                  Student Info
                </p>
                <br />
                <p
                  style={{
                    marginBottom: "10px",
                    fontWeight: 500,
                    fontSize: "20px",
                  }}
                >
                  {info.firstName} {info.lastName}
                </p>

                {/* <p
              style={{
                marginBottom: "10px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              (+251) 923-772845
            </p> */}
                <Row>
                  <p style={{ marginBottom: "10px", fontWeight: 500 }}>
                    Grade :
                    {info.class != null ? info.class.grade : "Unassigned"}
                  </p>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontWeight: 500,
                      marginLeft: "10px",
                    }}
                  >
                    Section :{info.class != null ? info.class.section : "Unassigned"}
                  </p>
                </Row>
                <p
                  style={{
                    marginBottom: "10px",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Sex:{info.sex}
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Age:{info.age}
                </p>
              </div>
              <EditOutlined
                style={{ fontSize: "20px" }}
                onClick={() => {
                  form.setFieldsValue({
                    key: info.uuid,
                    fName: info.firstName,
                    lName: info.lastName,
                    grade: info.class.grade,
                    section: info.class.section,
                  });
                  showModal();
                }}
              />
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
}

export default StudentInfoCard;
