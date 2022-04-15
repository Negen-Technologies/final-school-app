import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Form,
  Modal,
  Button,
  Typography,
  Popconfirm,
} from "antd";
import { connect } from "react-redux";
import AssignTeacherToCourseForm from "../CreateTeacher/AssignTeacherToCourseForm";
import {
  getAllTeacherSuccess,
  AllTeacherEdit,
  AllTeacherDelete,
  updateTeacher,
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
  const [visible, setVisible] = useState(false);
  const [teacherCourseList, setteacherCourseList] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  var teacherData = [];
  var numEachPage = 10;
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    const row = await form.validateFields();
    setEditingKey("");
    props.AllTeacherEdit(key, props.teachers, row);
  };
  const handleDelete = (key) => {
    props.AllTeacherDelete(key, props.teachers);

    
  };
  teacherData.splice(0, teacherData.length);

  useEffect(() => {
    if (teacherCourseList.length !== 0) {
      setVisible(true);
    }
  }, [teacherCourseList]);

  props.teachers.forEach((teacher) => {
    teacherData.push({
      key: teacher.uuid,
      teacherName: teacher.userInformation.name,
      subject: teacher.qualifiedCourses,
      userId: teacher.userId,
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
          return `${subjects.courseInformation.name}(Gr-${subjects.courseInformation.grade})`;
        });

        return allsubjects.join(", ");
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm
              title="Sure to Save?"
              onConfirm={() => save(record.userId)}
            >
              <a
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
            </Popconfirm>
            <Button type="link" onClick={cancel}>
              Cancel
            </Button>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => {
        var capable = record.subject.map((subjects) => {
          return {
            name: subjects.courseInformation.name,
            grade: subjects.courseInformation.grade,
            courseId: subjects.courseId,
          };
        });
        return (
          <Button
            type="link"
            onClick={() => {
              setteacherCourseList(capable);
              setEditingId(record.userId);
              setTeacherId(record.key);
            }}
          >
            Edit Courses
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            handleDelete(record.userId);
          }}
        >
          <a style={{ color: "red" }}>Delete</a>
        </Popconfirm>
      ),
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
    <>
      <Modal
        visible={visible}
        closable
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <AssignTeacherToCourseForm
          onSubmit={(val) => {
            props.updateTeacherAction(editingId, val, teacherId);
          }}
          isLoading={props.teachersPending}
          teacherCourseList={teacherCourseList}
        />
      </Modal>
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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    teachers: state.teacher.teachers,
    teachersPending: state.teacher.loading,
    teachersError: state.teacher.error,
    createTeacherPending: state.createTeacher.isPending,
    createTeacherError: state.createTeacher.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTeacherSuccess: () => dispatch(getAllTeacherSuccess()),
    AllTeacherEdit: (id, users, edited) =>
      dispatch(AllTeacherEdit(id, users, edited)),
    AllTeacherDelete: (id, users) => dispatch(AllTeacherDelete(id, users)),
    updateTeacherAction: (id, Courses, teacherid) =>
      dispatch(updateTeacher(id, Courses, teacherid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherTable);
