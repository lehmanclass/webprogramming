import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="login-register-form">
          <div className="inputs-container">
            <div className="inner-input-container">
              <input placeholder="username" />
            </div>

            <div className="inner-input-container">
              <input placeholder="password" />
            </div>

            <div className="inner-input-container">
              <button>Login</button>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
