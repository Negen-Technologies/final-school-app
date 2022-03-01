import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
} from "antd";
import { connect } from "react-redux";
import { getAllAdminSuccess,AllAdminEdit,
  AllAdminDelete } from "../../store";




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
  const inputNode = dataIndex==='role'||dataIndex==='uuid' ? <Input disabled={true} /> : <Input />;
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

const AdminTable = (props) => {
  const [form] = Form.useForm();
  var adminData = [];
  const [current, setCurrent] = useState(1);

  var numEachPage = 10;

  props.admins.forEach((element) => {
    adminData.push({ ...element, key: element.uuid });
  });
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
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
    props.AllAdminEdit(key,props.admins,row)

  };

  const handleDelete = (key) => {
    props.AllAdminDelete(key,props.admins)
  };

    const handleChange = (pageNumber, size) => {
      numEachPage=size;
      setCurrent(pageNumber);
      props.getAllAdminSuccess(numEachPage, pageNumber);
    };
  const columns = [
    {
      title: "Admin Name",
      dataIndex: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "Admin ID",
      dataIndex: "uuid",
      width: "25%",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "15%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm title="Sure to Save?" onConfirm={()=>save(record.key)}>
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
      render: (_, record) => <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              handleDelete(record.key);
            }}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
      ,
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
        dataSource={adminData}
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
    admins: state.admins.admins,
    adminsPending: state.admins.loading,
    adminsError: state.admins.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAdminSuccess: () => dispatch(getAllAdminSuccess()),
    AllAdminEdit: (id,users,edited) => dispatch(AllAdminEdit(id,users,edited)),
    AllAdminDelete: (id,users) => dispatch(AllAdminDelete(id,users)),
    


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
