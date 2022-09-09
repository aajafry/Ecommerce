import React from "react";
import { Link } from "react-router-dom";
import { useChec } from "../contexts/ChecContext";

export default function Confirmation() {
  const { order } = useChec();
  return order.customer ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h5>
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}
        </h5>
        <br />
        <br />
        <p>Order ref: {order.customer_reference}</p>
      </div>
      <Link to="/">
        <button> Back to Home</button>
      </Link>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      We don't recognize any order. pleace pick your product first.
      <Link to="/">
        <button className="btn btn-success my-3"> Back to Home</button>
      </Link>
    </div>
  );
}
