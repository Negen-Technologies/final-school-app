import React, { useState } from "react";
import { Table, Input, Form } from "antd";
import { connect } from "react-redux";
import {
  getAllTeacherSuccess,
  AllTeacherEdit,
  AllTeacherDelete,
} from "../../store";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    dataIndex === "subject" || dataIndex === "key" ? (
      <Input disabled={true} />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TeacherTable = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [current, setCurrent] = useState(1);

  var teacherData = [];
  var numEachPage = 10;
  const isEditing = (record) => record.key === editingKey;
  teacherData.splice(0, teacherData.length);

  props.teachers.forEach((teacher) => {
    teacherData.push({
      key: teacher.uuid,
      teacherName: teacher.userInformation.name,
      subject: teacher.qualifiedCourses,
    });
  });

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllTeacherSuccess(numEachPage, pageNumber);
  };
  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      width: "25%",
      editable: true,
    },
    {
      title: "Teacher ID",
      dataIndex: "key",
      width: "15%",
      editable: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      width: "40%",
      editable: true,
      render: (_, record) => {
        var allsubjects = record.subject.map((subjects) => {
          return subjects.courseInformation.name;
        });

        return allsubjects.join();
      },
    },
  ];

  
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={teacherData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          defaultCurrent: 1,
          total: props.count,
          onChange: handleChange,
          defaultPageSize: numEachPage,
          current: current,
          responsive: true,
          showSizeChanger: true,
          hideOnSinglePage: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </Form>
  );
};
const mapStateToProps = (state) => {
  return {
    teachers: state.teacher.teachers,
    teachersPending: state.teacher.loading,
    teachersError: state.teacher.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTeacherSuccess: () => dispatch(getAllTeacherSuccess()),
    AllTeacherEdit: (id, users, edited) =>
      dispatch(AllTeacherEdit(id, users, edited)),
    AllTeacherDelete: (id, users) => dispatch(AllTeacherDelete(id, users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherTable);
