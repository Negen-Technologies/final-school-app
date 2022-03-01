import { List, Avatar, Collapse } from "antd";
function ListOfNotes() {
  const data = [
    {
      title: "Notification 1, March 20,2021",
    },
    {
      title: "Notification 2, Feburary 20,2021",
    },
    {
      title: "Notification 3, March 20,2021",
    },
    {
      title: "Notification 1, March 20,2021",
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ border: "1px solid black", marginBottom: "5px" }}>
          <List.Item.Meta
            avatar={<Avatar src="/images/sampleWoman.jpg" />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
}
export default ListOfNotes;
