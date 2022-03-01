import React from "react";
import ProfileLayout from "../Components/ProfilePage/ProfileLayout";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { changeProfileAction } from "../store/index";

function profile({ userData, changeProfile, onFinish }) {
  console.log("userData", userData)
  console.log(userData)
  return (
    <div>
      <ProfileLayout
        changeProfile={changeProfile}
        userData={userData}
        onFinish={(checkedValues) => {
          checkedValues.Phone = "251" + checkedValues.Phone;
          console.log("cccccccccc", checkedValues);
          changeProfile(checkedValues);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    changeProfile: state.changeProfile,
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: (checkedValues) => dispatch(changeProfileAction(checkedValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(profile));
