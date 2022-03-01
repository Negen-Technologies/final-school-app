import React from "react";
import withAuth from "../utils/protectRoute";
import Avatar from "antd/lib/avatar/avatar";

function ParentSingleNotificationPage() {
  return (
    <div
      style={{
        paddingTop: "24px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Avatar
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
          }}
          src="/images/as.png"
        ></Avatar>
      </div>
      <br />
      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h1 style={{ fontWeight: "bolder", margin: "0" }}>Title of Notice</h1>
      </div>
      <br />
      <div
        style={{
          margin: "0px",
          marginLeft: "60px",
        }}
      >
        <p>
          Mollit veniam occaecat quis aliqua exercitation veniam nostrud ullamco
          officia quis esse velit irure nisi. Mollit consectetur ea fugiat do
          amet dolor occaecat consectetur pariatur fugiat duis non tempor. Ipsum
          sunt dolor magna magna qui esse minim. Proident cillum proident
          exercitation voluptate dolore laborum cupidatat consectetur voluptate
          et voluptate quis nisi. Adipisicing ex nisi elit ad sit culpa
          consequat esse consequat dolor officia dolor irure. Reprehenderit
          nulla eiusmod qui proident. Culpa ipsum laborum ipsum sit proident
          incididunt laboris culpa consequat laboris laborum dolore cupidatat.
        </p>
      </div>
      <br />
      <div
        style={{
            margin: "0px",
          marginRight: "16px"
        }}
      >
        <p style={{ fontWeight: "bolder", textAlign: 'right' }}>from Teacher Who</p>
      </div>
    </div>
  );
}

export default withAuth(ParentSingleNotificationPage);
