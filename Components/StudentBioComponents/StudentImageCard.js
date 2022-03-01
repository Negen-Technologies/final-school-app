import React,{useState} from "react";
import {Card, Upload, Space, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";



function StudentImageCard() {
    const [fileList, setFileList] = useState([]);
    // const [imageFile, setImageFile] = useState("/sampleWoman.jpg");
    const [imageFile, setImageFile] = useState("/sampleWoman.jpg");

  
    const propss = {
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
  return (
    <div>
      <Card
        style={{
          width: "350px",
          height: "300",
        }}
        hoverable="true"
      >
        <Space align="baseline" size="large">
          <Image src={imageFile} alt="me" />
          <Upload {...propss} showUploadList={false} accept=".jpg, .jpeg, .png">
            <EditOutlined style={{ fontSize: "20px" }} />
          </Upload>
        </Space>
      </Card>
    </div>
  );
}

export default StudentImageCard;
