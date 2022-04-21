import { Calendar } from "antd";
import moment from "moment";
import getConfig from "next/config";

moment.updateLocale("en", {
  weekdaysMin: ["S", "M", "T", "W", "T", "F", "S"],
});

export default function AttendanceMonth({ day, absentDays, width }) {
  const date = new Date(day);
  const { publicRuntimeConfig } = getConfig();
  const maxmonth = parseInt(moment().format("DD-MM-YYYY").split("-")[1]);
  const maxdate = parseInt(moment().format("DD-MM-YYYY").split("-")[0]);
  const maxyear = parseInt(moment().format("DD-MM-YYYY").split("-")[2]);
  
  const absentOn = absentDays;

  const noClassDays = publicRuntimeConfig.noClassDates;





  function dateCellRender(value) {

    return (
      <div
        style={
          value.month() != date.getUTCMonth()
            ? {
                height: "40px",
                width: width ? "60px" : "35px",
              }
            : value.format("dddd").toString() === "Saturday" ||
              value.format("dddd").toString() === "Sunday" ||
              noClassDays.includes(value.format("DD-MM-YYYY"))
            ? {
                backgroundColor: "#EBEBE4",
                width: width ? "60px" : "35px",
                height: "40px",
              }
            : absentOn.includes(value.date())
            ? {
                backgroundColor: "#FF0000",
                width: width ? "60px" : "35px",
                height: "40px",
              }
            : value.year() < maxyear
            ? {
                backgroundColor: "#EBEBE4",
                width: width ? "60px" : "35px",
                height: "40px",
              }
            : maxmonth < value.month() + 1 ||
              (maxmonth === value.month() + 1 && maxdate <= value.date())
            ? {
                backgroundColor: "#EBEBE4",
                width: width ? "60px" : "35px",
                height: "40px",
              }
            :  {
                backgroundColor: "#EBEBE4",
                width: width ? "60px" : "35px",
                height: "40px",
              }
        }
      >
        <h1
          style={{
            color:
              maxmonth === value.month() + 1 && maxdate === value.date()
                ? "#0466c8" : absentOn.includes(value.date()) ? 'white' : (value.format("dddd").toString() === "Saturday" ||
                value.format("dddd").toString() === "Sunday" ||
                noClassDays.includes(value.format("DD-MM-YYYY"))) ? 'white': 
                (value.year() < maxyear ) ? '#0466c8':
                  (maxmonth > value.month() + 1 ||
                (maxmonth === value.month() + 1 && maxdate >= value.date())) ? '#0466c8' :  
                
                 "white",
            fontSize: "15px",
            paddingTop: "6px",
          }}
        >
          {value.month() != date.getUTCMonth() ? <div></div> : value.date()}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Calendar
        style={
          width
            ? {
                width: width,
                border: "1px solid #f0f0f0",
                borderRadius: "2px",
                padding: "10px",
                marginBottom: "10px",
                paddingBottom: "0px",
                fontSize: "15px",
                fontWeight: "bolder",
              }
            : {
                width: "300px",
                border: "1px solid #f0f0f0",
                borderRadius: "2px",
                padding: "10px",
                marginBottom: "10px",
                paddingBottom: "0px",
                fontSize: "15px",
                fontWeight: "bolder",
              }
        }
        defaultValue={moment(date)}
        fullscreen={false}
        //validRange={[moment(Date.now())]}
        disabledDate={(current) => {
          var month = date.getUTCMonth(); //months from 1-12
          return current && current.month() != month;
        }}
        onSelect={(date) => {}}
        
        dateFullCellRender={dateCellRender}
        headerRender={() => (
          <div
            style={{
              marginLeft: "10px",
              padding: "10px",
              fontSize: "20px",
            }}
          >
            {moment(date).format("MMMM YYYY")}
          </div>
        )}
      ></Calendar>
    </div>
  );
}
