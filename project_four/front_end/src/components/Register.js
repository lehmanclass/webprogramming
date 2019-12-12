import React from "react";
import Nav from "./Nav";
import { Link, Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value.trim() });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value.trim() });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value.trim() });
  };

  render() {
    const { username, email, password } = this.state;
    const isValid = username && email && password;
    if (this.props.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Nav />
        <div className="login-register-form">
          <div className="inputs-container">
            <div className="form-header">
              <h1>BYFT</h1>
            </div>
            <div className="inner-input-container">
              <input
                placeholder="username"
                value={username}
                onChange={this.handleUsername}
                className="input-view"
              />
            </div>
            <div className="inner-input-container">
              <input
                placeholder="email"
                value={email}
                onChange={this.handleEmail}
                className="input-view"
              />
            </div>
            <div className="inner-input-container">
              <input
                className="input-view"
                placeholder="password"
                type="password"
                value={password}
                onChange={this.handlePassword}
              />
            </div>
            <div className="form-action-btn-container">
              <button
                className="btn blue form-btn m-b"
                onClick={() =>
                  isValid
                    ? this.props.registerUser(this.state)
                    : alert("Checks inputs")
                }
              >
                Register
              </button>
              <span>Have an account ?</span><Link to="/login">LogIn</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
