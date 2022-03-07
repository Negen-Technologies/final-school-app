import React from "react";
import { Table } from "antd";
import { connect } from "react-redux";


const dataSource = [
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 300,
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 200,
  },
];

function TeachersList(props) {
  var teachersListInClass=[];

   teachersListInClass.splice(0, teachersListInClass.length);

  props.teachers.forEach((teacher) => {
    teachersListInClass.push({
      key: teacher.uuid,
      name: `${teacher.userInformation.name}`,
      id: teacher.uuid,
    });
  });
  if (teachersListInClass.length == 0) {
      return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource} 
  
        />
      </div>
    );
    } else {
  return (

    <div>
      <Table
        columns={columns}
        dataSource={teachersListInClass} /*onChange={onChange}*/
      />
    </div>
  );
    }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.getTeachers.teachers,
    teachersIsPending: state.getTeachers.isPending,
    teachersIsError: state.getTeachers.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList);

