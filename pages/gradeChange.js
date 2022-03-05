import React, { useState, useContext, useEffect, useRef } from "react";
import withAuth from "../utils/protectRoute";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Modal,
  Form,
  Typography,
  Button,
  Col,
} from "antd";
import GradeChangeStudentFilter from "../Components/GradeChangeComponents/gradeChangeStudentFilter";
import { connect } from "react-redux";
import StudentFilter from "../Components/StudentsFilter/StudentsFilterCriteria";
import { gradeChangeAction } from "../store/GradeChange/gradeChangeAction";

const originData = [];

// for (let i = 0; i < 2; i++) {
//     originData.push({
//       key: i.toString(),
//       name: `Abebe ${i}`,
//       outOf15: 32,
//       outOf20: 32,
//       outOf50: 32,
//     });
//   }

function gradeChange({ assessment, changeAssessment, loading, error }) {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [numOfColumns, setNumOfColumns] = useState(0);
  const [commentForChange, setCommentForChange] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [recordKey, setRecordKey] = useState(false);

  const [editedMark, setEditedMark] = useState(0);
  const [oldValue, setOldValue] = useState(0);
  const [reason, setReason] = useState("");
  const [resultId, setResultId] = useState("");
  const [valueId, setValueId] = useState("100");

  const { TextArea } = Input;
  const isEditing = (record) => record.key === editingKey;

  const colu = [
    {
      title: "Students",
      dataIndex: "name",
      width: "25%",
      editable: false,
    },
    {
      title: "Edit marks",
      dataIndex: "editing",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                setRecordKey(record.key);
                showModal();
                // save(record.key)
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
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
  ];

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
    // const inputNode =  <InputNumber /> ;
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
            {/* parseInt(valueId) */}
            <Input
              min={0}
              max={100}
              type="number"
              onClick={(value) => {
                var key = [];
                var keyWithComma = [];
                var keyWithCommaSplit = [];

                keyWithComma.forEach((e) => {
                  //console.log('e', e.split(',')[0])
                  keyWithCommaSplit.push();
                });
              }}
              onChange={(value) => {
                var key = [];
                var keyWithComma = [];

                console.log("VALUE on change: ", value);
                setValueId(parseInt(`${value.target.id}`));
                var editedRow = columnAssessmentReplica.filter(
                  (item) => item.key === editingKey
                );
                var dd = editedRow.find((item) => {
                  key = Object.keys(item);

                  key.forEach((item) => {
                    if (item.includes(",")) {
                      keyWithComma.push(item);
                    }
                  });
                });
                var k = `${value.target.id},id`;
                var valueId = editedRow[0][k];
                console.log("VALUE ID target: ", editedRow[0][value.target.id]);
                setOldValue(editedRow[0][value.target.id]);
                setResultId(valueId);
                console.log("VALUE ID RESULTiD: ", resultId);
                console.log("type of data", data);

                console.log("the id ", typeof value.target.value);
                setEditedMark(value.target.value);
              }}
            />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  console.log("VVVVVVVVVVV: ", resultId);
  console.log("VALUE ID RESULT: ", valueId);

  const listOfAssessment = assessment;
  var listOfAssessValue = [];
  var totalAssess = 0;
  console.log("LIST CONSOLE", listOfAssessment);

  listOfAssessment.forEach((value) => {
    listOfAssessValue.push({ val: value.value, assessName: value.name });
  });

  listOfAssessValue.forEach((value) => {
    totalAssess += value.val;
  });
  listOfAssessValue.push({ val: totalAssess, assessName: "Total" });

  listOfAssessValue.sort();
  var i = 1;
  var col1 = [];
  var columnAssessmentData = [];
  var columnAssessmentReplica = [];

  console.log("LIST OF ASSESSMENT: ", listOfAssessValue);
  listOfAssessValue.forEach((value) => {
    colu.splice(i, 0, {
      title: `${value.assessName} (${value.val})`,
      dataIndex: `${value.val}`,
      width: "20%",
      editable: value.assessName === "Total" ? false : true,
    });
    i++;
  });

  var resultIdValuePair = [];
  //console.log('1234512345', listOfAssessment)
  listOfAssessment.forEach((value) => {
    value.results.forEach((result) => {
      col1.push({
        key: result.uuid,
        marks: value.value,
        fName: result.studentInformation.firstName,
        name:
          result.studentInformation.firstName +
          " " +
          result.studentInformation.lastName,
        outOf: result.result,
      });
      resultIdValuePair.push({
        [value.value]: result.uuid,
      });
    });
  });

  console.log("ARRAY colllll: ", col1);
  var result = Object.values(
    col1.reduce((a, c) => {
      (
        a[c.fName] ||
        (a[c.fName] = {
          key: c.key,
          name: c.name,
          outOfList: [],
        })
      ).outOfList.push({ [`${c.marks}`]: c.outOf });
      return a;
    }, {})
  );

  // replicated the result for post request purposes

  var result2 = Object.values(
    col1.reduce((a, c) => {
      (
        a[c.fName] ||
        (a[c.fName] = {
          key: c.key,
          name: c.name,
          outOfList: [],
        })
      ).outOfList.push(
        { [`${c.marks}`]: c.outOf },
        { [`${c.marks},id`]: c.key }
      );
      return a;
    }, {})
  );
  result2.forEach((value) => {
    var obj1 = [];
    value.outOfList.forEach((outOf) => {
      value = { ...value, ...outOf };
      obj1.push(value);
    });
    columnAssessmentReplica.push(obj1[obj1.length - 1]);

    delete columnAssessmentReplica.outOfList;
    obj1 = [];
  });
  //console.log('ARRAY resull: ', result)
  console.log("ARRAY iddddd: ", columnAssessmentReplica);

  result.forEach((value) => {
    var obj1 = [];
    value.outOfList.forEach((outOf) => {
      value = { ...value, ...outOf };
      obj1.push(value);
    });
    columnAssessmentData.push(obj1[obj1.length - 1]);

    delete columnAssessmentData.outOfList;
    obj1 = [];
  });

  columnAssessmentData.forEach((value) => {
    delete value.outOfList;
  });
  var a = [];
  var numAssessment = 0;
  columnAssessmentData.forEach((value) => {
    a = Object.values(value);
    a.forEach((value) => {
      if (typeof value == "number") {
        numAssessment += value;
      }
    });
    value["100"] = numAssessment;
    numAssessment = 0;
  });

  console.log("ARRAY ccccccc: ", columnAssessmentData);

  const onChange = (e) => {
    setReason(e.target.value);
    //console.log('Change:', e.target.value);
  };

  const edit = (record) => {
    setData(columnAssessmentData);
    // var dataForEdit = columnAssessmentData[0]
    const dataForEdit = Object.assign({}, columnAssessmentData[0]);
    for (var key in dataForEdit) {
      dataForEdit[key] = "";
    }
    delete dataForEdit.key;
    // form.setFieldsValue({
    //   name: '',
    //   outOf10: '',
    //   outOf20: '',
    //   outOf30: '',
    //   outOf40: '',
    //   address: '',
    //   ...record,
    // });

    form.setFieldsValue({ ...dataForEdit, ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const setStateValue = (newData) => {
    setData(newData);
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      var newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      const val = newData.find((item) => key === item.key);
      delete val.name;
      delete val.key;
      // Object.keys(row).map(function (key, index) {
      //   row[key] = parseFloat(row[key]);
      // });

      // val.find((item) => {})
      if (index > -1) {
        const item = newData[index];
        // var mergedItem = {...item, ...row};
        console.log("NEWDATA", row);
        newData.splice(index, 1, { ...item, ...row });
        console.log("bbb", newData);

        setStateValue(newData);
        // console.log("before CALL: ", resultId, editedMark, reason);
        changeAssessment(resultId, editedMark, reason, oldValue); ///patch request for grade change
      } else {
        newData.push(row);
        setStateValue(newData);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = colu.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const showModal = () => {
    // loadingTrue();
    setVisible(true);
  };
  const handleOk = () => {
    // setConfirmLoading(true);
    save(recordKey);

    setTimeout(() => {
      setVisible(false);
      // setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    //console.log("Clicked cancel button");
    setVisible(false);
  };
  console.log("rrrrrrrrrrrrrr: ", resultId);
  return (
    <div>
      <div
        style={{
          padding: 32,
          fontSize: 24,
          fontWeight: 5,
        }}
      >
        Students Mark Edit
      </div>
      <div
        style={{
          padding: 16,
        }}
      >
        {/* <GradeChangeStudentFilter /> */}
        <StudentFilter
          isForGradeChange={true}
          style={{ marginTop: "20px" }}
          isAssessmentRequested={(value) => {
            //console.log("888888888888888888", value);
          }}
        />
      </div>

      <div
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 16,
        }}
      >
        <Form form={form} component={false}>
          <Table
            scroll={{ x: true }}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={columnAssessmentData}
            columns={mergedColumns}
            rowClassName="editable-row"
            // pagination={{
            //   onChange: cancel,
            // }}
          />
        </Form>
      </div>
      <Modal
        title="Grade Change Reason"
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={"80vw"}
        disabled={reason != ""}
        bodyStyle={{ width: "100%" }}
        footer={[
          <Button
            type="primary"
            key="ok"
            style={{
              width: 200,
              marginLeft: "10px",
            }}
            onClick={handleOk}
            loading={loading}
            //   error={error}
          >
            Ok
          </Button>,
        ]}
      >
        <div
          style={{
            padding: 16,
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "5",
              marginBottom: "20px",
            }}
          >
            Write Your Reason to Change Grade
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "left",
            padding: 16,
          }}
        >
          <TextArea
            showCount
            maxLength={100}
            rows={6}
            style={{ height: "20vh", width: "70vw" }}
            onChange={onChange}
          />
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    assessment: state.getAssessment.message,
    gradeChange: state.gradeChange.message,
    loading: state.gradeChange.loading,
    error: state.getAssessment.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAssessment: (resultId, newResult, comment, oldValue) =>
      dispatch(gradeChangeAction(resultId, newResult, comment, oldValue)),
    // loadingFalse: () => dispatch(loadingFalse()),
    // loadingTrue: () => dispatch(loadingTrue()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(gradeChange));
