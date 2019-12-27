import React from "react";
import Nav from "./Nav";
import { Link, Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value.trim() });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value.trim() });
  };

  render() {
    const { username, password } = this.state;
    const isValid = username && password;

    if (this.props.redirect) {
      return <Redirect to="/goals" />;
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
                className="input-view"
                placeholder="username"
                value={username}
                onChange={this.handleUsername}
              />
            </div>

            <div className="inner-input-container">
              <input
                className="input-view"
                type="password"
                placeholder="password"
                onChange={this.handlePassword}
              />
            </div>

            <div className="form-action-btn-container">
              <button
                className="btn blue form-btn m-b"
                onClick={() =>
                  isValid
                    ? this.props.login(this.state)
                    : alert("Checks inputs")
                }
              >
                LogIn
              </button>
              <span>Don't have an account ?</span>{" "}
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
