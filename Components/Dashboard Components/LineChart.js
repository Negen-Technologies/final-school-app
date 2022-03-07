import React from "react";
import { Chart, Line, Point, Tooltip, Legend } from "bizcharts";
import { primary_color } from "../../utils/constants";
const data = [
  // {
  // 	month: "Jan",
  // 	city: "Tokyo",
  // 	temperature: 7
  // },
  {
    month: "Jan",
    city: "London",
    average: 3.9,
  },
  // {
  // 	month: "Feb",
  // 	city: "Tokyo",
  // 	temperature: 6.9
  // },
  {
    month: "Feb",
    city: "London",
    average: 4.2,
  },
  // {
  // 	month: "Mar",
  // 	city: "Tokyo",
  // 	temperature: 9.5
  // },
  {
    month: "Mar",
    city: "London",
    average: 5.7,
  },
  // {
  // 	month: "Apr",
  // 	city: "Tokyo",
  // 	temperature: 14.5
  // },
  {
    month: "Apr",
    city: "London",
    average: 8.5,
  },
  // {
  // 	month: "May",
  // 	city: "Tokyo",
  // 	temperature: 18.4
  // },
  {
    month: "May",
    city: "London",
    average: 11.9,
  },
  // {
  // 	month: "Jun",
  // 	city: "Tokyo",
  // 	temperature: 21.5
  // },
  {
    month: "Jun",
    city: "London",
    average: 15.2,
  },
  // {
  // 	month: "Jul",
  // 	city: "Tokyo",
  // 	temperature: 25.2
  // },
  {
    month: "Jul",
    city: "London",
    average: 17,
  },
  // {
  // 	month: "Aug",
  // 	city: "Tokyo",
  // 	temperature: 26.5
  // },
  {
    month: "Aug",
    city: "London",
    average: 16.6,
  },
  // {
  // 	month: "Sep",
  // 	city: "Tokyo",
  // 	temperature: 23.3
  // },
  {
    month: "Sep",
    city: "London",
    average: 14.2,
  },
  // {
  // 	month: "Oct",
  // 	city: "Tokyo",
  // 	temperature: 18.3
  // },
  {
    month: "Oct",
    city: "London",
    average: 10.3,
  },
  // {
  // 	month: "Nov",
  // 	city: "Tokyo",
  // 	temperature: 13.9
  // },
  {
    month: "Nov",
    city: "London",
    average: 6.6,
  },
  // {
  // 	month: "Dec",
  // 	city: "Tokyo",
  // 	temperature: 9.6
  // },
  {
    month: "Dec",
    city: "London",
    average: 4.8,
  },
];

const scale = {
  average: { min: 0 },
  city: {
    formatter: (v) => {
      return {
        London: "London",
        // Tokyo: 'Tokyo'
      }[v];
    },
  },
};

function LineChartComponent() {
  return (
    <Chart
      scale={scale}
      padding={[30, 20, 60, 40]}
      autoFit
      height={320}
      data={data}
      interactions={["element-active"]}
    >
      <Point position="month*average" color="#4d4d4d" shape="circle" />
      <Line
        shape="smooth"
        position="month*average"
        color={primary_color}
        label="average"
      />
      <Tooltip
        shared
        showCrosshairs
        region={null}
        g2-tooltip-list-item={{ display: "flex" }}
      />
      <Legend
        background={{
          padding: [5, 100, 5, 36],
          style: {
            fill: "#eaeaea",
            stroke: "#fff",
          },
        }}
      />
    </Chart>
  );
}

export default LineChartComponent;
