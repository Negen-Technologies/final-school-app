import React, { useEffect } from "react";
import {
  G2,
  Chart,
  Tooltip,
  Interval,
  Legend,
  useTheme,
  registerTheme,
  getTheme,
} from "bizcharts";
import { connect } from "react-redux";
import primary_color from "../../public/constants";

registerTheme("my-theme", {
  defaultColor: primary_color,
  geometries: {
    interval: {
      rect: {
        default: { style: { fill: primary_color, fillOpacity: 0.95 } },
        active: { style: { stroke: "#5AD8A6", lineWidth: 1 } },
        inactive: { style: { fillOpacity: 0.3, strokeOpacity: 0.3 } },
        selected: {},
      },
    },
  },
});



function BarChart(dashboard) {
  const [theme, setTheme] = useTheme("my-theme");
  var chartData = [];

  var attendanceValues = [];
  const academicDayOne = new Date("2021-9-20");

  var today = new Date();
  var todayString =
    `${today.getFullYear()}` +
    "-" +
    `${today.getMonth() + 1}` +
    "-" +
    `${today.getDate()}`;
  var dateToday = new Date(todayString);
  var Difference_In_Time = dateToday.getTime() - academicDayOne.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  var datesTillToday = Math.abs(dateToday - academicDayOne);
  const diffDays = Math.ceil(datesTillToday / (1000 * 60 * 60 * 24));
  var todayCount = dashboard.dashboard.today
    ? `Today,${dashboard.dashboard.today.count}`
    : "0";
  var lastSevenDaysCount = dashboard.dashboard.lastSevenDays
    ? `Last Seven Days,${Number.parseFloat(
        dashboard.dashboard.lastSevenDays.count / 7
      ).toFixed(2).toString()}`
    : "0";
  var lastMonthCount = dashboard.dashboard.lastMonth
    ? `Last Month,${Number.parseFloat(
        dashboard.dashboard.lastMonth.count / 20
      ).toFixed(2).toString()}`
    : "0";
  var lastYearCount = dashboard.dashboard.lastYear
    ? `Last Year,${Number.parseFloat(
        dashboard.dashboard.lastYear.count / diffDays
      ).toFixed(2).toString()}`
    : "0";

  attendanceValues.push(
    todayCount,
    lastSevenDaysCount,
    lastMonthCount,
    lastYearCount
  );

  attendanceValues.forEach((element) => {
    var splitValues = element.split(",");
    chartData.push({
      Name: "Attendance",
      When: splitValues[0],
      Absentees: splitValues[1],
    });
  });

  return (
    <Chart
      height={300}
      padding="auto"
      data={chartData}
      theme={theme}
      autoFit
      containerStyle={{
        padding: "10px",
      }}
    >
      <Interval
        adjust={[
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]}
        // color="name"
        position="When*Absentees"
      />
      <Tooltip shared />
      <Legend
        layout="vertical"
        position="top-left"
        // itemName={{ formatter: () => 'custname' }} itemValue={{ formatter: () => 323 }}
        itemName={{
          spacing: 10, // 文本同滑轨的距离
          style: {
            // stroke: 'blue',
            fill: primary_color,
          },
          formatter: (text, item, index) => {
            return text === text;
          },
        }}
      />
    </Chart>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
