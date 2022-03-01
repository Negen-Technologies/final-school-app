import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as legoData from "./legoloading.json";
import * as doneData from "./doneloading.json";
import { connect } from "react-redux";

function Loading(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: doneData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return props.visible ? (
    <>
      <div
        style={{
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: "1000",
          background: "rgba(34, 34, 34, 0.812)",
          zIndex:'1000'
        }}
      >
        <div
          style={{
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <div
            style={{
              left: "50%",
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <FadeIn>
              <div>
                {!props.dataReady ? (
                  <Lottie options={defaultOptions} height={120} width={120} />
                ) : (
                  <Lottie options={defaultOptions2} height={120} width={120} />
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

const mapStateToProps = (state) => {
  return {
    visible: state.loading.visible,
    dataReady: state.loading.dataReady,
  };
};

export default connect(mapStateToProps)(Loading);
