import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useChec } from "../contexts/ChecContext";
import "../styles/Cart.css";

export default function Carts() {
  const { cart, handleEmptyCart } = useChec();

  const EmptyCart = () => (
    <div className="row emptyCart">
      <div className="col-md-12">
        <h4>
          You have no item in your shoping cart,
          <br />
          <Link to="/">start adding some!</Link>
        </h4>
      </div>
    </div>
  );

  const FilledCart = () => (
    <>
      <div className="row">
        {cart.line_items.map((lineItem) => (
          <div className="col-md-3">
            <CartItem key={lineItem.id} Item={lineItem} />
          </div>
        ))}
      </div>

      <div className="row my-5">
        <h4 className="">Subtotal: {cart.subtotal.formatted_with_symbol}</h4>
      </div>

      <div className="row">
        <div className="btn-group">
          <span><button className="btn btn-success" onClick={handleEmptyCart}>
            Empty cart
          </button></span>
          <Link to="/checkout">
            <button className="btn btn-success">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h4 className="my-5">Your Shoping Cart</h4>
      {!cart.total_unique_items ? <EmptyCart /> : <FilledCart />}
    </div>
  );
}
