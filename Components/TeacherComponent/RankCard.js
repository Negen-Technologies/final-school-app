import React, { useEffect } from "react";
import { Card, List, Avatar, Table } from "antd";
import { classRankAction } from "../../store/ClassRank/classRankAction";
import { getClassList } from "../../store/ClassList/ClassListAction";
import { connect } from "react-redux";

function RankCard({
  col,
  width,
  hight,
  title,
  data
}) {
  
  return (
    <div>
      <Card
        title={title}
        style={{
          width: `${width ? width : "400px"}`,
          hight: `${hight ? hight : "200px"}`,
          // border: `2px solid ${col}`,
        }}
      >
        
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                // avatar={
                //   <Avatar src="https://joeschmoe.io/api/v1/random" />
                // }
                title={<p>{item.title}</p>}
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
