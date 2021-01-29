import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { loginUser } from "../../../actions/auth";
import "./style.scss";
import { connect } from "react-redux";

interface Props {
  loginUser: (email: string, password: string) => void;
}

const Login: React.FC<Props> = ({ loginUser }) => {
  const [email, setEmail] = useState<string>("john@yahoo.com");
  const [password, setPassword] = useState<string>("123456789");

  const login = (e: any) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <MainLayout>
      <div className="login">
        <h1>Sign In</h1>
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
            Sign in
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default connect(null, { loginUser })(Login);
