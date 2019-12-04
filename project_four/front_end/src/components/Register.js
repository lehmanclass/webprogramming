import React from "react";
import Nav from './Nav';

class Register extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="login-register-form">
          <div>
            <input placeholder="username" />
            <input placeholder="email" />
            <input placeholder="password" />
            <button>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
