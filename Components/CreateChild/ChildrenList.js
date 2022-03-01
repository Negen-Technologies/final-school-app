import React from 'react'
import {Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";

function ChildrenList({name,grade,image}) {
    return (
      <div>
        <Card
          style={{
            minWidth: 300,
            maxWidth: 500,
            marginTop: 16,
            marginLeft: 20,
            backgroundColor: "transparent",
            border: "1px solid black",
          }}
        >
          <Meta
            avatar={<Avatar size="large" src={image} />}
            title={name}
            description={grade}
          />
        </Card>
      </div>
    );
}

export default ChildrenList
