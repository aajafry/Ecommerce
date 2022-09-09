import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2>404</h2>
      <h4>Pages not found!</h4>
      <button
        className="btn btn-success"
        type="button"
        onClick={() => navigate("/")}
      >
        {" "}
        Go back to home{" "}
      </button>
    </div>
  );
}
