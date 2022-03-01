// import React from 'react';
// import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
// // import numeral from 'numeral';

// // CDN START

// class BarLabel extends React.Component {
//   render() {
//     const data = [
//       {
//         age: 'Male',
//         count: 0.08,
//       },
//       {
//         age: 'Female',
//         count: 0.12,
//       },
    
//     ];
//     const cols = {};
//     return (
//       <Chart
//         height={200}
//         data={data}
//         scale={cols}
//         padding="auto"
//         autoFit
//       >
//         <Coord transpose />
//         <Axis name="age" />
//         <Axis name="count" visible={false} />
//         <Tooltip />
//         {/* 凸显类型 color={['age', '#E6F6C8-#3376CB']} */}
//         <Geom
//           type="interval"
//           position="age*count"
//           color={['count', '#E6F6C8-#3376CB']}
//         //   label={['age*count', (name, value) => numeral(value || 0).format('0.0%')]}

//         >
//         </Geom>
//       </Chart>
//     );
//   }
// }

// export default BarLabel



import React from "react";
import {
  G2,
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class BarLabel extends React.Component {
  render() {
    const data = [
      {
        label: "Demography",
        Male: 40,
        Female: 60
      },
    //   {
    //     label: "Tuesday",
    //     series1: 1800,
    //     series2: 1300
    //   },
    //   {
    //     label: "Wednesday",
    //     series1: 950,
    //     series2: 900
    //   },
    //   {
    //     label: "Thursday",
    //     series1: 500,
    //     series2: 390
    //   },
    //   {
    //     label: "Friday",
    //     series1: 170,
    //     series2: 100
    //   }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["Male", "Female"],
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    return (
        <Chart 
          height={200} 
        //   width={500}
          data={dv} 
          autoFit
        >
          <Legend />
          <Coordinate transpose scale={[1, -1]} />
          <Axis
            name="label"
            label={{
              offset: 12
            }}
          />
          <Axis name="value" position={"right"} />
          <Tooltip />
          <Interval
            position="label*value"
            color={"type"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
    );
  }
}
export default BarLabel