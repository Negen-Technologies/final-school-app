import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "antd";
import TopicMenu from "../components/layoutComponents/TopicMenu";
import NavBar from "../components/layoutComponents/NavBar";
import SideBar from "../components/layoutComponents/SideBar";
import {adminmenu, parentmenu, teachermenu} from "./menuLinks";
import { connect } from "react-redux";

export function index(props) {
  const router = useRouter();
  const items =
    props.userData.data.role == "parent"
      ? parentmenu
      :props.userData.data.role == "teacher"?teachermenu: adminmenu;

      
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState(localStorage.getItem("selectedKey")||"0");
  const [breakpointBool, setBreakpointBool] = useState(false);
  
  const changeSelectedKey = (event) => {
    localStorage.setItem("selectedKey", event.key);
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
    router.push(items[key].link);
  };
  const Menu = (
    <TopicMenu
      items={items}
      selectedKey={selectedKey}
      
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div>
      <Layout hasSider width="100%">
        <SideBar
          menu={Menu}
          onBreakpoint={(broken) => {
            setBreakpointBool(broken);
          }}
          theme="dark"
        />
        <Layout
          style={breakpointBool ? { marginLeft: 0 } : { marginLeft: 200 }}
          width="100%"
        >
          <NavBar menu={Menu} style={{ padding: 0 }} />
          <Layout.Content
            style={
              breakpointBool
                ? { margin: "24px 16px 0",height:"100%" }
                : { margin: "24px 16px 0", overflow: "initial" ,height:"100%"}
            }
          >
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (value) => dispatch(authLogin(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
