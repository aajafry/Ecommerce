import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Reset.css";

import { useAuth } from "../contexts/AuthContext";

function Reset() {
  const [email, setEmail] = useState("");
  const { passwordreset } = useAuth();

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => passwordreset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;
