import { Modal } from "antd";
import { connect } from "react-redux";
import { loadingFalse, messageNull } from "../../store/index";
import Router from "next/router";
function info(props) {
  Modal.info({
    content: (
      <div>
        <p>{props.msg}</p>
      </div>
    ),
    onOk() {
      props.messageNull();
    },
  });
}

function success(props) {
  Modal.success({
    content: (
      <div>
        <p>{props.msg}</p>
      </div>
    ),
    onOk() {
      props.messageNull();
    },
  });
}

function error(props) {
  Modal.error({
    content: (
      <div>
        <p>{props.msg}</p>
      </div>
    ),
    onOk() {
      props.messageNull();
      if (props.msg == "Network Error") {
        props.loadingFalse();
      }
      if (props.message.status == 401) {
        props.loadingFalse();
        Router.push("/Login");
      }
    },
  });
}

function Message(props) {
  return (
    <div>
      {props.visible
        ? props.type == "success"
          ? success(props)
          : props.type == "error"
          ? error(props)
          : props.type == "info"
          ? info(props)
          : ""
        : ""}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    visible: state.message.msgVisible,
    msg: state.message.msg,
    message: state.message,
    type: state.message.msgType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    messageNull: () => dispatch(messageNull()),
    loadingFalse: () => dispatch(loadingFalse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
