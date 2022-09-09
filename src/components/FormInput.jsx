import React from "react";

export default function FormInput({ name, label }) {
  return (
    <div
      className="textField"
      style={{
        margin: "1rem",
        justifyContent: "space-around",
        display: "flex",
      }}
    >
      <label> {label} </label>
      {"  "}
      <input type="text" name={name} placeholder={label} required />
    </div>
  );
}
