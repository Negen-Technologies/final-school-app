import React from "react";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
// import createTeacherForm from "../Components/CreateChild/createTeacherdForm"; //HERE
import { createTeacher } from "../store/createTeacher/createTeacherAction";

function createTeacherPage({
  createTeacher,
  createTeacherFunction,
  createdUser,
}) {
  return (
    <
    >
      <createTeacherForm
        createTeacher={createTeacher}
        // userData={userData}
        onFinish={(checkedValues) => {
          checkedValues.Phone = "+251" + checkedValues.Phone;
          console.log(checkedValues);
          console.log(createdUser);
          checkedValues["teacherId"] = createdUser.uuid;
          createTeacherFunction(checkedValues);
          console.log(checkedValues);
        }}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    createTeacher: state.createTeacher,
    createdUser: state.createUser.createdUser,
    isPending: state.createUser.isPending,
    error: state.createUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTeacherFunction: (value) => dispatch(createTeacher(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(createTeacherPage));
