import React from "react";
import { useRouter } from "next/router";

function ErrorHandlingPage({ route }) {
  const Router = useRouter();

  return (
    <>
      <div>error-handling-page</div>
      <button onClick={()=>{Router.replace(route);}}>back to home</button>
    </>
  );

}

export default ErrorHandlingPage;
