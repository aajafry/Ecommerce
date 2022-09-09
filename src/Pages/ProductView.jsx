import React, { useEffect, useState } from "react";

import Product from "../components/Product";
import { commerce } from "../lib/commerce";

export default function ProductView() {
  const [product, setProduct] = useState([]);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    setProduct(response);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Product product={product} />
        </div>
      </div>

      <h4 className="mb-5">Related Products</h4>
      <div className="row">
        {product.related_products?.map((rproduct) => (
          <div className="col-md-3" key={rproduct.id}>
            <Product product={rproduct} />
          </div>
        ))}
      </div>
    </div>
  );
}
