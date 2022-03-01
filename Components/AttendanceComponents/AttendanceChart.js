import React from "react";
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
  getTheme,
} from "bizcharts";

export default function AttendanceChart() {
  const data = [
    { item: "Grade 1", count: 20, percent: 0.2 },
    { item: "Grade 2", count: 10, percent: 0.1 },
    { item: "Grade 3", count: 9, percent: 0.09 },
    { item: "Grade 4", count: 7, percent: 0.07 },
    { item: "Grade 5", count: 4, percent: 0.04 },
    { item: "Grade 6", count: 20, percent: 0.2 },
    { item: "Grade 7", count: 10, percent: 0.1 },
    { item: "Grade 8", count: 9, percent: 0.09 },
    { item: "Grade 9", count: 7, percent: 0.07 },
    { item: "Grade 10", count: 4, percent: 0.04 },
  ];

  const cols = {
    percent: {
      formatter: (val) => {
        val = val * 100 + "%";
        return val;
      },
    },
  };

  return (
    <Chart height={400} data={data} scale={cols} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        color="item"
        style={{
          lineWidth: 1,
          stroke: "#fff",
        }}
        label={[
          "count",
          {
            content: (data) => {
              return;
            },
          },
        ]}
        state={{
          selected: {
            style: (t) => {
              const res = getTheme().geometries.interval.rect.selected.style(t);
              return { ...res, fill: "red" };
            },
          },
        }}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  );
}
