import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useChec } from "../contexts/ChecContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { cart } = useChec();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  return (
    <header className="navbar-header mb-5">
      <nav class="navbar navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand">
            E-Commerce
          </Link>
          <div class="d-flex">
            {currentUser ? (
              <div className="span-group">
                <span>{currentUser.displayName}</span>
                <span onClick={logout} style={{ cursor: "pointer" }}>
                  <FiLogOut />
                </span>
              </div>
            ) : (
              <div className="btn-group">
                <Link to="login" class="btn btn-outline-success">
                  Login
                </Link>
                <Link to="register" class="btn btn-outline-success">
                  Register
                </Link>
              </div>
            )}
            {location.pathname === "/cart" ? null : (
              <Link to="/cart" className="btn btn-success position-relative">
                <FaShoppingCart />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                  {cart.total_unique_items}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
