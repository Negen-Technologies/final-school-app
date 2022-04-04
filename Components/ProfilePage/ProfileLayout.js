import React, { useState, useEffect } from "react";
import {
  Avatar,
  Input,
  Form,
  Space,
  Button,
  Modal,
  Upload,
  Select,
} from "antd";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { changeProfileAction } from "../../store/ChangeProfile/changeProfileAction";
import storage from "../../utils/firebaseUpload";

function ProfileLayout({
  changeProfileData,
  userData,
  courses,
  changeProfile,
}) {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [qualiCourseList, setQualiCourseList] = useState([]);
  const [myClassList, setMyClassList] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (userData.token) {
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
            `${userData.data.myClasses[i].courseInformation.name} Grade${userData.data.myClasses[i].courseInformation.grade}`,
          ];
        }
        setMyClassList(updateMyClass);
      }

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

  const onUploadSuccess = (image) => {
    setFileList([]);
    image.status = "done";
    image.url = imageUrl;
    image.thumbUrl = imageUrl;
    image.percent = 100;
    const newFileList = [image];
    setFileList(newFileList);
  };
  const onUploadError = (image) => {
    setFileList([]);
    image.status = "error";
    image.url = "";
    image.thumbUrl = "";
    image.percent = 0;
    const newFileList = [image];
    setFileList(newFileList);
  };
  const uploadImg = async (image) => {
    if (image == null) return;
    setImageUrl("Getting Download Link...");
    // Sending File to Firebase Storage

    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .then(() => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
            onUploadSuccess(image);
            setUploading(false);
          })
          .catch((err) => {
            setImageUrl("");
            onUploadError(image);
            setUploading(false);
          });
      });
  };

  const props = {
    onRemove: (file) => {
      setFileList([]);
    },
    onChange: (info) => {
      setUploading(true);
      setFileList([]);
      uploadImg(info.file);
    },
    beforeUpload: async (file) => {
      setImageFile(URL.createObjectURL(file));
    },
    fileList,
  };

  function success() {
    Modal.success({
      title: changeProfileData.message,
    });
  }
  if (changeProfileData.message) {
    success();
  }
  const onSubmit = (checkedValues) => {
    checkedValues["url"] = imageUrl;

    changeProfile(checkedValues);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Form
          size="large"
          form={form}
          labelCol={{ span: 4 }}
          onFinish={(checkedValues) => onSubmit(checkedValues)}
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
              showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: false,
                showDownloadIcon: false,
              }}
              accept=".jpg, .jpeg, .png"
            >
              <Space align="end">
                <Avatar
                  offset={5}
                  size={{ xs: 80, sm: 80, md: 100, lg: 140, xl: 140, xxl: 140 }}
                  src={uploading ? "" : imageFile}
                >
                  {uploading ? (
                    <LoadingOutlined style={{ color: "blue" }} />
                  ) : (
                    "Profile"
                  )}
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
            rules={[{ required: true, message: "Missing Phone Number" }]}
          >
            <Input
              disabled={true}
              placeholder="Phone Number"
              addonBefore="+251"
            />
          </Form.Item>
          {userData.data.role == "teacher" ? (
            <div>
              <Form.Item name="myClasses">
                <div>
                  <p>My Classes</p>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={["a10", "c12"]}
                  >
                    {myClassList}
                  </Select>
                </div>
              </Form.Item>

              <Form.Item name="qualifiesCourses">
                <div>
                  <p>Qualified Courses</p>

                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={["Physics", "Chemistry"]}
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
              loading={changeProfileData.isPending}
              disabled={uploading}
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
    changeProfileData: state.changeProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: (checkedValues) =>
      dispatch(changeProfileAction(checkedValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
