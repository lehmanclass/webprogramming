import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      authed: false
    };
  }
  nameChange = event => {
    this.setState({ name: event.target.value });
  };
  emailChange = event => {
    this.setState({ email: event.target.value });
  };

  passwordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleRegister = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(data => data.json())
      .then(data => {
        localStorage.setItem("id", data.id);

        this.setState({
          authed: true
        });
      });
  };

  render() {
    if (this.state.authed) {
      return <Redirect to="/cart" />;
    }
    return (
      <div>
        <form className="login-from" onSubmit={this.handleRegister}>
          <h1 className="log-in-header">Register</h1>

          <div>
            <p>
              <label>Name</label>
            </p>
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameChange}
              required
            />

            <p>
              <label>Email</label>
            </p>
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailChange}
              required
            />

            <p>
              <label>Password</label>
            </p>
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
              required
            />
            <br />

            <button className="btn" type="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    );
  }
}
