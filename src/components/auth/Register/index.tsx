import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { register } from "../../../actions/auth";
import "./style.scss";
import { connect } from "react-redux";

interface Props {
  register: (email: string, password: string) => void;
}

const Register: React.FC<Props> = ({ register }) => {
  const [email, setEmail] = useState<string>("john@yahoo.com");
  const [password, setPassword] = useState<string>("123456789");

  const login = (e: any) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <MainLayout>
      <div className="login">
        <h1>Register</h1>
        <form className="form" onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="submit" type="submit">
            Sign Up
          </button>
        </form>
        <p style={{ fontFamily: "Apercu" }}>
          Already have an account?{" "}
          <Link style={{ textDecoration: "underline" }} to="/account">
            Login
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default connect(null, { register })(Register);
