import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import style from "styled-components";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  emailOnChange = event => {
    this.setState({ email: event.target.value });
  };
  passwordOnChange = event => {
    this.setState({ password: event.target.value });
  };

  handleLogin = e => {
    e.preventDefault();

    const { email, password } = this.state;

    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("id", data.id);

        this.setState({
          authed: true
        });
      });
  };

  render() {
    const { authed } = this.state;
    if (authed) {
      return <Redirect to="/cart" />;
    }

    return (
      <div className="login-form-container">
        <form className="login-form">
          <h1 className="log-in-header">Log In</h1>
          <div>
            <p>
              <label>Email</label>
            </p>
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailOnChange}
              required
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordOnChange}
              required
            />
            <br />
            <button onClick={this.handleLogin} className="btn" type="submit">
              Log in
            </button>
            <Link to="/register">
              <button className="btn">Create Account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
