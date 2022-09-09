import React from "react";
import { useChec } from "../contexts/ChecContext";

export default function Review({ shippingData }) {
  const { checkoutToken } = useChec();
  return (
    <>
      <h4 className="my-5">Order Summery</h4>
      <div className="row">
        {checkoutToken.line_items.map((product) => (
          <div className="col-md-3">
            <div class="card" key={product.id}>
              <img
                src={product.image?.url}
                class="card-img-top"
                alt={product.name}
              />
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <h5 class="card-title">Quantity: {product.quantity}</h5>
                <h5 class="card-title">
                  Price: {product.line_total.formatted_with_symbol}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row my-5">
        <h5>Sub-Total: {checkoutToken.subtotal.formatted_with_symbol}</h5>
        <h5>
          Shiping Cost:{" "}
          {shippingData.shippingOption.price.formatted_with_symbol}
        </h5>
      </div>
    </>
  );
}
