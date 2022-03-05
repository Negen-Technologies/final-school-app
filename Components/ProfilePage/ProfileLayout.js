import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Input,
  Form,
  Space,
  Row,
  Button,
  Modal,
  Col,
  Upload,
  Select
} from "antd";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { changeProfileAction } from "../../store/ChangeProfile/changeProfileAction";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const { Option } = Select;


function handleChange(value) {
  console.log(`selected ${value}`);
}
function onFinishFailed() {
  console.log("on finish failed");
}


 

// const checkPrice = (_, value) => {
//   var phoneno = /^\d{9}$/;

//   if (value.match(phoneno)) {
//     return Promise.resolve();
//   } else {
//     return Promise.reject(new Error("Please input a valid phone number!"));
//   }
  
// };

function ProfileLayout({ changeProfile, userData, courses}) {
  const [fileList, setFileList] = useState([]);
  const [qualiCourseList, setQualiCourseList] = useState([]);
  const [myClassList, setMyClassList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm();
  const router = useRouter();

  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  
console.log('fir name', userData.data.name)
console.log('las name', lName)
console.log('las name', userData.data.phoneNumber)

  useEffect(() => {
    if (userData.token) {
    console.log('USER data: ', userData.data)
      if (userData.role == "teacher") {
        for (let i = 0; i < courses.data.length; i++) {
          const updateQualiCourse = [
            // copy the current users state
            ...qualiCourseList,

            `${courses.data[i].name} Grade${courses.data[i].grade}`,
          ];
        }
        setQualiCourseList(updateQualiCourse);
        for (let i = 0; i < userData.data.myClasses.length.length; i++) {
          const updateMyClass = [
            ...myClassList,
            `${userData.data.myClasses[i].courseInformation.name} Grade${userData.data.myClasses[i].courseInformation.grade}`
          ]
        }
        setMyClassList(updateMyClass);
      }
      console.log(userData)

      form.setFieldsValue({
        email: userData.data.email,
        Phone: userData.data.phoneNumber.slice(
          4,
          userData.data.phoneNumber.length
        ),
        fName: userData.data.name.split(" ")[0],
        lName:
          userData.data.name.split(" ").length > 1
            ? userData.data.name.split(" ")[1]
            : "",
        myClasses: myClassList,
        qualifiesCourses: qualiCourseList,
      });

    }
  });

  const props = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([]);
      const newFileList = [file];

      setFileList(newFileList);
      setImageFile(URL.createObjectURL(file));
      // return false;
    },
    fileList,
  };

  function success() {
    Modal.success({
      title: changeProfile.message ,
    });
  }
  if(changeProfile.message){
    success()
  }
console.log('change profile', userData.data)
const onSubmit = (checkedValues) => {
  console.log('on submit', checkedValues)
  
  // if (changeProfile !== checkedValues) {
  //   Modal.error({
  //     title: 'profile edit failed' ,
  //   });
  // } else {
    changeProfile(checkedValues);
   
  // }
}

  return (
    <div>
      <div style={{ textAlign: "center"}}>
        <Form
          size="large"
          form={form}
          labelCol={{ span: 4 }}
          onFinish={(checkedValues) => onSubmit(checkedValues)}
          onFinishFailed={onFinishFailed}
          wrapperCol={{
            xs: { span: 16, offset: 1 },
            sm: { span: 16, offset: 3 },
            md: { span: 12, offset: 4 },
            lg: { span: 12, offset: 6 },
            xl: { span: 12, offset: 6 },
          }}

        >
          <div style={{ marginBottom: 40, marginTop: "5%" }}>
            <Upload
              {...props}
              showUploadList={false}
              accept=".jpg, .jpeg, .png"
            >
              <Space align="end">
                <Avatar
                  offset={5}
                  size={{ xs: 80, sm: 80, md: 100, lg: 140, xl: 140, xxl: 140 }}
                  src={imageFile}
                >
                  Name
                </Avatar>
                <EditOutlined />
              </Space>
            </Upload>
          </div>
          <Form.Item
                  name="fName"
                  
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name="lName"
                  
                  rules={[{ required: true, message: "Missing last name" }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
       
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="Phone"
            rules={[
              { required: true, message: "Missing Phone Number" },
              
            ]}
          >
            <Input disabled={true} placeholder="Phone Number" addonBefore="+251" />
          </Form.Item>
          {userData.data.role == "teacher" ? (
            <div>
              <Form.Item
              name="myClasses"
              >
                <div>
                  <p>My Classes</p>
                  <Select
                    mode="multiple"
                    
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={["a10", "c12"]}
                    onChange={handleChange}
                  >
                    {myClassList}
                  </Select>
                </div>
              </Form.Item>

              <Form.Item
              name="qualifiesCourses"
              >
                <div>
                  <p>Qualified Courses</p>

                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={["Physics", "Chemistry"]}
                    onChange={handleChange}
                   
                  >
                    {qualiCourseList}
                  </Select>
                </div>
              </Form.Item>
            </div>
          ) : (
            <div></div>
          )}

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginLeft: 30 }}
              loading={userData.loading}
              
            >
              Submit
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.auth,
    changeProfile: state.changeProfile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: (checkedValues) => dispatch(changeProfileAction(checkedValues))
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
