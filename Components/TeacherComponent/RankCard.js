import React from "react";
import { Card, List, Avatar } from "antd";



function RankCard({col,width, hight, title}) {
    const data = [
      {
        title: "Ant Design Title 1",
      },
      {
        title: "Ant Design Title 2",
      },
      {
        title: "Ant Design Title 3",
      },
     
    ];
    return (
      <div>
        <Card title={title}
          style={{
            width: `${width ? width : "400px"}`,
            hight: `${hight ? hight : "200px"}`,
            border: `2px solid ${col}`,
             
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
}

export default RankCard;
