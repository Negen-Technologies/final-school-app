import { useRouter } from "next/router";
import Layout from "../layout";
import {
  adminroutes,
  parentroutes,
  teacherroutes,
  adminmenu,
  parentmenu,
  teachermenu,
} from "../layout/menuLinks";
import ErrorHandlingPage from "../pages/error-handling-page";
const checkIfValueExistsInArray = (value, arrayOfDictionaries) => {
  return arrayOfDictionaries.includes(value);
};

//check If Value Exists In Array Of Dictionaries
function checker(value, ArrayOfDictionaries) {
  ArrayOfDictionaries.forEach((element) => {
    console.log(element.link, value);
    return element.link === value ? true : null;
  });
  return false;
}

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!accessToken) {
        Router.replace("/Login");
        return null;
      }

      if (role === "parent") {
        if (!checkIfValueExistsInArray(Router.pathname, parentroutes)) {
          return <ErrorHandlingPage route="/parent-overview-page" />;
        }
        if (parentmenu.some((e) => e.link == Router.pathname)) {
          var index = parentmenu.findIndex((element) => {
            return element.link === Router.pathname;
          });
          localStorage.setItem("selectedKey", index.toString());
        }
      }
      if (role === "admin") {
        if (!checkIfValueExistsInArray(Router.pathname, adminroutes)) {
          return <ErrorHandlingPage route="/HomePage" />;
        }
        if (adminmenu.some((e) => e.link == Router.pathname)) {
          var i = adminmenu.findIndex((element) => {
            return element.link === Router.pathname;
          });
          localStorage.setItem("selectedKey", i.toString());
        }
      }
      if (role === "teacher") {
        if (!checkIfValueExistsInArray(Router.pathname, teacherroutes)) {
          return <ErrorHandlingPage route="/teacherHomePage" />;
        }
        if (teachermenu.some((e) => e.link == Router.pathname)) {
          var index = teachermenu.findIndex((element) => {
            return element.link === Router.pathname;
          });
          localStorage.setItem("selectedKey", index.toString());
        }
      }
      if (
        Router.pathname == "/Login" ||
        Router.pathname == "/ForgotPassword" ||
        Router.pathname == "/ResetPasswordPage" ||
        Router.pathname == "/"
      ) {
        return <WrappedComponent {...props} />;
      } else {
        return (
          <Layout>
            <WrappedComponent {...props} />
          </Layout>
        );
      }
    }

    return null;
  };
};

export default withAuth;
