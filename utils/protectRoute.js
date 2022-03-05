import { useRouter } from "next/router";
import Layout from "../layout";
import { parentmenu, adminmenu, teachermenu } from "../layout/menuLinks";

const checkIfValueExistsInArrayOfDictionaries = (
  value,
  arrayOfDictionaries
) => {
  let result = false;
  arrayOfDictionaries.forEach((element) => {
    if (element.link === value) {
      result = true;
    }
  });
  return result;
};

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

      // if (role === "parent") {
      //   if (!checkIfValueExistsInArrayOfDictionaries(Router.pathname, parentmenu)) {
      //   Router.replace("/parent-overview-page");
      //   }
      // }
      // if (role === "admin") {
      //   if (!checkIfValueExistsInArrayOfDictionaries(Router.pathname, adminmenu)) {

      //   Router.replace("/HomePage");
      //   }
      // }
      // if (role === "teacher") {
      //   if (
      //     !checkIfValueExistsInArrayOfDictionaries(Router.pathname, teachermenu)
      //   ) {
      //     Router.replace("/teacherHomePage");
      //   }
      // }
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
