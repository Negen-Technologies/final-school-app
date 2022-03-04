import React, { useEffect } from "react";
import { Card, List, Avatar } from "antd";
import { classRankAction } from "../../store/ClassRank/classRankAction";
import { getClassList } from "../../store/ClassList/ClassListAction";
import { connect } from "react-redux";

function RankCard({
  col,
  width,
  hight,
  title,
  classRankAction,
  getClassList,
  classList,
  classRank,
}) {
  useEffect(() => {
    getClassList();
  }, []);
  const classId =
    classList.classes.length > 0 ? classList.classes.map(val => val.coursesList.length > 0 ? val : null) : null;

  useEffect(() => {
    if (classId) {
      classRankAction(classId);
    }
  }, [classList]);
  console.log("classRank", classId);
  console.log("classList", classList);

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
      <Card
        title={title}
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
                // avatar={
                //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                // }
                title={<a href="">{item.title}</a>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    classRank: state.classRank,
    classList: state.classList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    classRankAction: (classId) => dispatch(classRankAction(classId)),
    getClassList: () => dispatch(getClassList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankCard);
