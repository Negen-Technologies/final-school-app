import React, {  useState } from "react";
import { Col, Tabs, Row, Button, Modal, Input } from "antd";
import { useRouter } from "next/router";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../store";
import AssesmentTable from "../Components/TeacherComponent/AssesmentTable"
import { PlusCircleFilled, SaveFilled } from "@ant-design/icons";


const { TabPane } = Tabs;

function assesmentPage() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  const showModal = () => {
    setVisible(true);
  };


  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div
        style={{  padding: "20px" }}
        className="card-container"
      >
        <Tabs type="card">
          <TabPane tab="Tab Title 1" key="1">
            <AssesmentTable/>
          </TabPane>
          <TabPane tab="Tab Title 2" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="Tab Title 3" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </div>
      <div>
        <Row style ={{
          marginLeft: '48px',
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Col span = {12}>
          <Button
              type="primary"
              onClick={showModal}
              style={{ marginTop: "10px" }}
              icon={<PlusCircleFilled />}
            >
              Create Assessment
            </Button>
          </Col>
          <Col span = {6}>
          <Button
              type="primary"
              // onClick={}
              style={{ marginTop: "10px", alignSelf: "right"}}
              icon={<SaveFilled />}
            >
              Save Marks 
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        title="Add a Students"
        visible={visible}
        onOk={handleOk}
        footer={[
          <Button
            type="primary"
            style={{
              width: 200,
              marginLeft: "10px",
            }}
            // onClick={() =>
            // }
            htmlType="submit"
            // disabled={!filter.section && studentId}
            // loading={isPending}
            // error={error}
          >
            Submit
          </Button>,
        ]}
        // confirmLoading={isPending}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          <div style = {{
            width: "70%", 
            margin: "auto",
          }}>
            <Input
              style={{ width: "100%", marginBottom: "5px" }}
              // onChange={(val) => setStudentId(val.target.value)}
              placeholder="Test Name"
            />
            <Input
              style={{ width: "100%", marginBottom: "5px" }}
              // onChange={(val) => setStudentId(val.target.value)}
              placeholder="Test Value"
            />
            {/* <Filter min={true}></Filter> */}
          </div>
        }
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(assesmentPage));
