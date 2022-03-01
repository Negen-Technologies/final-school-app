import React,{useEffect} from "react";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import CreateChildForm from "../Components/CreateChild/CreateChildForm"; //HERE
import ChildrenList from "../Components/CreateChild/ChildrenList";
import { createChild } from "../store/CreateChild/CreateChildAction";
import { filterStudentsByParent } from "../store/index";
import { Col, Divider, Empty, Row } from "antd";

function CreateChildPage({
  createChild,
  createChildFunction,
  createdUser,
  filterStudents,
  requestStudents,
}) {
  var listOfChildren = [
    {
      name: "Sample Student 1",
      grade: "Grade 5",
      image: "./sampleMan.jpg",
    },
    {
      name: "Sample Student 1",
      grade: "Grade 5",
      image: "./sampleMan.jpg",
    },

    {
      name: "Sample Student 1",
      grade: "Grade 5",
      image: "./sampleMan.jpg",
    },
  ];

  useEffect(() => {
    filterStudents(createdUser.uuid);
  }, []);

  console.log(requestStudents);
  return (
    <div
      style={{
        overflowY: scroll,
      }}
    >
      <CreateChildForm
        createChild={createChild}
        // userData={userData}
        onFinish={(checkedValues) => {
          console.log(checkedValues);
          console.log(createdUser);
          checkedValues["parentId"] = createdUser.uuid;
          createChildFunction(checkedValues);
          console.log(checkedValues);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    createChild: state.createChild,
    createdUser: state.createUser.createdUser,
    isPending: state.createUser.isPending,
    error: state.createUser.error,
    requestStudents: state.requestStudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChildFunction: (value) => dispatch(createChild(value)),
    filterStudents: (value) => dispatch(filterStudentsByParent(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChildPage);
