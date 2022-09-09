import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { useAuth } from "../contexts/AuthContext";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signInWithGoogle } = useAuth();
  const Navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
    Navigate("/");
  }
  return (
    <div className="login">
      <form className="login__container" onSubmit={handleLogin}>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className=" login__btn btn-success" type="submit">
          Login
        </button>
        <button
          className="login__btn login__google"
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
            Navigate("/");
          }}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </form>
    </div>
  );
}
export default LogIn;
