import React from "react";
import { Table } from "antd";
const AssesmentTable = (props) => {
const columns = [
  {
    title: "Student Name",
    dataIndex: "name",
  },
  {
    title: "Student ID",
    dataIndex: "uuid",
    
  },
  {
    title: "Test One",
    dataIndex: "testOne",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Test Two",
    dataIndex: "testTwo",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Test Three",
    dataIndex: "testThree",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
},
     {
    title: "Test Four",
    dataIndex: "testFour",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Total Score",
    dataIndex: "totalScore",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },

},
];

const data = [
  {
    key: "1",
    name: "John Brown",
    testOne: 98,
    testTwo: 60,
    testThree: 70,
    testFour: 60,
    totalScore: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    testOne: 98,
    testTwo: 60,
    testThree: 70,
    testFour: 60,
    totalScore: 70,
  },
  {
    key: "3",
    name: "Joe Black",
    testOne: 98,
    testTwo: 60,
    testThree: 70,
    testFour: 60,
    totalScore: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    testOne: 98,
    testTwo: 60,
    testThree: 70,
    testFour: 60,
    totalScore: 70,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

return(
  <Table columns={columns} dataSource={data} onChange={onChange} />
);
  };

export default AssesmentTable;
 

