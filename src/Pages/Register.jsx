import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const { singup, signInWithGoogle } = useAuth();

  function handlesubmit(e) {
    e.preventDefault();
    singup(name, email, password);
    Navigate("/");
  }

  return (
    <div className="register">
      <form className="register__container" onSubmit={handlesubmit}>
        <input
          type="text"
          className="register__textBox"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" type="submit">
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
            Navigate("/");
          }}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </form>
    </div>
  );
}
export default Register;
