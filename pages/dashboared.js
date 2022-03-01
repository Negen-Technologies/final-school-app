// import headerStyled from '../components/Header.module.css'
import { Card, Row, Col, Divider, Radio } from "antd";
import SliderChart from "../components/Dashboard Components/chart";
import Demo from "../components/Dashboard Components/Carddash";
import BarLabel from "../components/Dashboard Components/DemographyBar";

export default function dashboared() {
  return (
    <>
      <div>
        <Card size="small" style={{ width: "50" }}>
          <Demo />
        </Card>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card
              title={"New Title"}
              extra={
                <Radio.Group
                  defaultValue="a"
                  buttonStyle="solid"
                  onChange={(value) => {
                    console.log(value);
                  }}
                >
                  <Radio.Button value="a">All</Radio.Button>
                  <Radio.Button value="b">This Month</Radio.Button>
                  <Radio.Button value="c">This Year</Radio.Button>
                </Radio.Group>
              }
            >
              <SliderChart />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Card title">
              {/* <SliderChart/> */}
              <BarLabel />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}