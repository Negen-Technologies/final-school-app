import React from "react";
import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Annotation,
  useTheme,
  registerTheme,
  getTheme,
} from "bizcharts";
import { connect } from "react-redux";
import { primary_color } from "../../utils/constants";

const sliceNumber = 0.01;

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

registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["L", points[1].x, points[1].y - sliceNumber]);
    path.push(["L", points[2].x, points[2].y - sliceNumber]);
    path.push(["L", points[3].x, points[3].y]);
    path.push("Z");
    path = this.parsePath(path);
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path,
      },
    });
  },
});

function SliderChart(getAllStudents) {
  const [theme, setTheme] = useTheme("my-theme");
  var male = 0;
  var female = 0;
  const data = [
    {
      type: "Female",
      value: 0,
    },
    {
      type: "Male",
      value: 0,
    },
  ];
  getAllStudents.getAllStudents.students.forEach((element) => {
    if (element.sex === "Male") {
      male++;
    } else {
      female++;
    }
  });
  data.forEach((element) => {
    if (element.type === "Female") {
      element.value = female;
    } else {
      element.value = male;
    }
  });
  return (
    <Chart data={data} height={190} theme={theme} width={190} autoFit>
      <Coordinate type="theta" radius={1.0} innerRadius={0.9} />
      <Axis visible={false} />
      <Tooltip showTitle={false} />
      <Interval
        adjust="stack"
        position="value"
        color="type"
        shape="sliceShape"
      />
      <Annotation.Text
        position={["50%", "50%"]}
        content="Male/Female"
        style={{
          lineHeight: "240px",
          fontSize: "20",
          fill: primary_color,
          textAlign: "center",
        }}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  );
}
const mapStateToProps = (state) => {
  return {
    getAllStudents: state.getAllStudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SliderChart);
