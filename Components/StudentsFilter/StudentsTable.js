import React, { useEffect, useState } from "react";
import { Col, Input, Row, Table, Button, Modal } from "antd";
import { connect } from "react-redux";
import { setStudentsId } from "../../store/StudentFilter/StudentFilterAction";
import { getSingleStudentAttendance } from "../../store/SingleStudentAttendance/singleStudentAttendanceAction";
import { getSingleStudentInfo } from "../../store/singleStudentInfo/singleStudentInfoAction";
import { updateSingleStudentInfo } from "../../store/singleStudentInfo/singleStudentInfoAction";
import EditChildForm from "../CreateChild/EditChildForm";

const dataSource = [];
var studentsList = [];

function StudentTable({
  students,
  mini,
  getid,
  singleStudentInfo,
  studentAttendanceAction,
  studentInfoAction,
  setStudentId,
  updateSingleStudentInfo,
  detail = false,
}) {
  const [visible, setVisible] = useState(false);
  const [studId, setStudId] = useState("");

  // useEffect(() => {
  //   singleStudentInfo ? setVisible(false) : null;
  // }, [singleStudentInfo]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Section",
      dataIndex: "section",
    },
    {
      title: "",
      dataIndex: "opration",
      render: (_, record) => (
        <Button
          type="default"
          style={{
            width: 120,
            marginBottom: "2px",
          }}
          onClick={() => {
            var id = record.id;
            setStudId(id);
            showModal();
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "opration",
      render: (_, record) => (
        <Button
          type="primary"
          style={{
            width: 120,
            marginBottom: "2px",
          }}
          onClick={() => {
            var id = record.id;
            getid(id);
            setStudentId(id);
            studentInfoAction(id);
            studentAttendanceAction(id);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  const miniColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
  ];

  const detailColumn = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "opration",
      render: (_, record) => (
        <Button
          type="primary"
          style={{
            width: 120,
            marginBottom: "2px",
          }}
          onClick={() => {
            var id = record.id;
            setStudentId(id);
          }}
        >
          View Card
        </Button>
      ),
    },
  ];

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [searchField, setsearchField] = useState("");

  studentsList.splice(0, studentsList.length);
  students.forEach((student) => {
    studentsList.push({
      key: student.uuid,
      name: `${student.firstName} ${student.lastName}`,
      id: student.uuid,
      class: student.class.grade,
      section: student.class.section,
    });
  });

  const filteredStudents = studentsList.filter((stu) => {
    return stu.name.toLowerCase().includes(searchField.toLowerCase());
  });
  if (students.length == 0) {
    return (
      <div style={{}}>
        <Table
          columns={detail ? detailColumn : mini ? miniColumns : columns}
          dataSource={dataSource} /*onChange={onChange}*/
        />
      </div>
    );
  } else {
    return (
      <div style={{}}>
        <Row>
          <h3 style={{ marginLeft: "4" }}>Search by Name</h3>
          <Input
            style={{ width: "240px", marginBottom: "10px", marginLeft: "10px" }}
            onChange={(input) => {
              setsearchField(input.target.value);
            }}
          />
        </Row>
        <Table
          columns={detail ? detailColumn : mini ? miniColumns : columns}
          dataSource={filteredStudents} /*onChange={onChange}*/
          scroll={{ x: true }}
          pagination={{ pageSize: 6 }}
        />
        <Modal
          title="Edit Student Profile"
          visible={visible}
          onCancel={handleCancel}
          // width={"65vw"}
          // disabled={reason != ""}
          bodyStyle={{ width: "100%" }}
          footer={[
            <div></div>,
            // <Button
            //   type="primary"
            //   key="ok"
            //   style={{
            //     width: 200,
            //     marginLeft: "10px",
            //   }}
            //   onClick={handleOk}
            //   // loading={loading}
            //   //   error={error}
            // >
            //   Ok
            // </Button>,
          ]}
        >
          <EditChildForm studentId={studId} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.requestStudents.students,
    singleStudentInfo: state.singleStudentInfo.info,
    error: state.singleStudentInfo.error,
    loading: state.singleStudentInfo.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStudentId: (studentId) => dispatch(setStudentsId(studentId)),
    studentInfoAction: (id) => dispatch(getSingleStudentInfo(id)),
    studentAttendanceAction: (id) => dispatch(getSingleStudentAttendance(id)),
    updateSingleStudentInfo: (data) => dispatch(updateSingleStudentInfo(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);
