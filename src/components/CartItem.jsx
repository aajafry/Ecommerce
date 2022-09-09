import React from "react";
import { useChec } from "../contexts/ChecContext";
import "../styles/CartItem.css";

export default function CartItem({ Item }) {
  const { handleUpdateCartQty, handleRemoveFromCart } = useChec();
  return (
    <div class="card">
      <img src={Item.image?.url} class="card-img-top" alt={Item.name} />
      <div class="card-body">
        <h5 class="card-title">{Item.name}</h5>
        <div className="cart-item__details-qty">
          <button
            type="button"
            className="cart-item__details-qty_increment"
            onClick={() => handleUpdateCartQty(Item.id, Item.quantity + 1)}
          >
            {" "}
            +{" "}
          </button>
          <p>{Item.quantity}</p>
          <button
            type="button"
            className="cart-item__details-qty_decrement"
            onClick={() => handleUpdateCartQty(Item.id, Item.quantity - 1)}
          >
            {" "}
            -{" "}
          </button>
        </div>
        <h5 class="card-title">{Item.line_total.formatted_with_symbol}</h5>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleRemoveFromCart(Item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
