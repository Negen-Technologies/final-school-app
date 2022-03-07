import React,{useState} from "react";
import { useRouter } from "next/router";
import { Result, Button, Spin } from "antd";

function ErrorHandlingPage({ route }) {
  const Router = useRouter();
const [loading, setLoading] = useState(false);
  return (
    <>
      <Result
        style={{
          marginTop: "60px",
        }}
        status="500"
        title="Sorry, you are not authorized to access this page."
        extra={
          <>
            {" "}
            <Button
              onClick={() => {
                setLoading(true);
                Router.replace(route);
              }}
              type="primary"
            >
              Back Home
            </Button>
            {loading ? (
              <div>
                <Spin
                  style={{
                    fontSize: "60px",
                    marginTop: "20px",
                  }}
                  size="large"
                />
              </div>
            ) : (
              <></>
            )}
          </>
        }
      />
    </>
  );
}

export default ErrorHandlingPage;
