import React from "react";
import ProfileLayout from "../Components/ProfilePage/ProfileLayout";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { changeProfileAction } from "../store/index";

function profile({ userData, changeProfile, }) {
  return (
    <div>
      <ProfileLayout
        changeProfile={changeProfile}
        userData={userData}
        onFinish={(checkedValues) => {
          checkedValues.Phone = "251" + checkedValues.Phone;
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
