import React,{useState} from "react";

function CustomCheckBoxer() {
    const [checked, setChecked] = useState(false);
  return (
    <label
      style={{
        display: "block",
        position: "relative",
        paddingLeft: "35px",
        marginBottom: "12px",
        cursor: "pointer",
        fontSize: "14px",
        // WebkitUserSelect: "none",
        // MozUserSelect: "none",
        // msUserSelect: "none",
        // userSelect: "none",
      }}
    >
      One
      <input
        type="checkbox"
        style={{
          position: "absolute",
          opacity: 0,
          cursor: "pointer",
          height: 0,
          width: 0,
          //   backgroundColor: checked ? "red" : "white",
        }}
        onClick={(event) => {
          setChecked(event.target.checked);
        }}
      />
      <span
        style={checked?{
          position: "absolute",
          top: 0,
          left: 0,
          height: "15px",
          width: "15px",
          backgroundColor: checked ? "red" : "#eee",
          display: "block",
        }:{
            position: "absolute",
            content:"",
            display:"none",
        
        }}
      ></span>
    </label>
  );
}

export default CustomCheckBoxer;
