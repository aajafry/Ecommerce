import React from "react";
import { Banner, Categories, Product } from "../components/index";
import { useChec } from "../contexts/ChecContext";

export default function Products() {
  const { products } = useChec();

  return (
    <>
      <Banner />
      <div className="container">
        <h4 className="mb-5">All Products</h4>
        <div className="row">
          {products?.map((product) => (
            <div className="col-md-3">
              <Product key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
      <Categories />
    </>
  );
}
