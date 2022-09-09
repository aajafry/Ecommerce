import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useChec } from "../contexts/ChecContext";
import "../styles/Product.css";

export default function Product({ product }) {
  const { handleAddToCart } = useChec();
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <img
        src={product.image?.url}
        className="card-img-top"
        alt={product.name}
        style={{ width: "100%", height: "min-content" }}
      />
      <div className="card-body" style={{ backgroundColor: "#eee" }}>
        <Link to={`ProductView/${product.id}`}>
          <div className="card-title-group">
            <h5 className="card-title">{product.name}</h5>
            <h5 className="card-title">{product.price?.formatted_with_code}</h5>
          </div>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
        </Link>
        <div className="card-action-btn">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleAddToCart(product.id, 1)}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
