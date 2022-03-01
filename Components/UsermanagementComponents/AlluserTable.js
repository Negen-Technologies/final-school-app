import React, { useState } from "react";
import { Table, Input, Popconfirm, Form, Typography, Button } from "antd";
import { connect } from "react-redux";
import { getAllUserSuccess, AllUserEdit, AllUserDelete } from "../../store";

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
    dataIndex === "phoneNumber" ||
    dataIndex === "role" ||
    dataIndex === "uuid" ? (
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

const AllUserTable = (props) => {
  const [form] = Form.useForm();
  var numEachPage = 10;
  var data = [];
  const [current, setCurrent] = useState(1);
  const [loadedpage, setLoadedPage] = useState([1]);
  props.users.forEach((element) => {
    data.push({ ...element, key: element.uuid });
  });
  const [editingKey, setEditingKey] = useState("");

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
    props.AllUserEdit(key, props.users, row);
  };
  const handleDelete = (key) => {
    props.AllUserDelete(key, props.users);
  };

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllUserSuccess(numEachPage, pageNumber);
    setLoadedPage([...loadedpage, pageNumber]);
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "ID",
      dataIndex: "uuid",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "PhoneNo",
      dataIndex: "phoneNumber",
      editable: true,
      render: (text) => {
        return <div>{text.includes("+251") ? text : "+251" + text}</div>;
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
              title="Sure to save?"
              onConfirm={() => save(record.key)}
            >
              <Button
                type="link"
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Button>
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
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            handleDelete(record.key);
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
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        style={
          {
            // paddingTop: 20,
          }
        }
        scroll={{ x: 200 }}
        bordered
        dataSource={data}
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
    users: state.allusers.allusers,
    count: state.allusers.count,

    usersPending: state.allusers.loading,
    usersError: state.allusers.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserSuccess: (limit, page) =>
      dispatch(getAllUserSuccess(limit, page)),
    AllUserEdit: (id, users, edited) =>
      dispatch(AllUserEdit(id, users, edited)),
    AllUserDelete: (id, users) => dispatch(AllUserDelete(id, users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUserTable);
