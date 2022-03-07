import { useRouter } from "next/router";
import Layout from "../layout";
import { adminroutes, parentroutes, teacherroutes } from "../layout/menuLinks";
import ErrorHandlingPage from "../pages/error-handling-page";
const checkIfValueExistsInArrayOfDictionaries = (
  value,
  arrayOfDictionaries
) => {
  return arrayOfDictionaries.includes(value);
};

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      console.log(Router.pathname);
      const accessToken = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!accessToken) {
        Router.replace("/Login");
        return null;
      }

      if (role === "parent") {
        if (
          !checkIfValueExistsInArrayOfDictionaries(
            Router.pathname,
            parentroutes
          )
        ) {
          return <ErrorHandlingPage route="/parent-overview-page" />;
        }
      }
      if (role === "admin") {
        if (
          !checkIfValueExistsInArrayOfDictionaries(Router.pathname, adminroutes)
        ) {
          return <ErrorHandlingPage route="/HomePage" />;
        }
      }
      if (role === "teacher") {
        if (
          !checkIfValueExistsInArrayOfDictionaries(
            Router.pathname,
            teacherroutes
          )
        ) {
          return <ErrorHandlingPage route="/teacherHomePage" />;
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
