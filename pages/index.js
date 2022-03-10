import React, { useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { loadingFalse, loadingTrue } from "../store/index";

export function index(props) {
  useEffect(() => {
    props.loadingTrue();
    var token = localStorage.getItem("token");

    if (token == null) {
      props.loadingFalse();
      Router.push("/Login");
    } else {
      Router.push("/HomePage");
    }
  });
  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingFalse: () => dispatch(loadingFalse()),
    loadingTrue: () => dispatch(loadingTrue()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
