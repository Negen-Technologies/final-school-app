
import React from "react";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { Modal } from "antd";
import CreateUserForm from "../Components/CreateUser/CreateUserForm";
import { createUser } from "../store/CreateUser/CreateUserAction";
import Router from "next/router";

function CreateUserPage({ createUserState, createUserFunction, ondataChange,onCanceled }) {
  console.log("mannnnnnn", createUserState);
  if (createUserState.createdUser.role === "parent") {
    ondataChange("parent");
  }
  if (createUserState.createdUser.role === "teacher") {
    ondataChange("teacher");
  }
  return (
    <div
      
    >
      <CreateUserForm
        createUser={createUserState}
        onFinish={(checkedValues) => {
          checkedValues.Phone = "+251" + checkedValues.phoneNo;
          console.log("-----------------------");

          if (checkedValues.confirmPassword !== checkedValues.password) {
            Modal.error({
              title: "passwords did not match.",
            });
          } else {
            console.log(checkedValues);
            createUserFunction(checkedValues);
            // if (checkedValues.role==="parent") {
            Router.push("/CreateChildPage");
            // }
          }
        }}
        onCancel={(value)=>{
         
          onCanceled(value);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    createUserState: state.createUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUserFunction: (userData) => dispatch(createUser(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserPage);
