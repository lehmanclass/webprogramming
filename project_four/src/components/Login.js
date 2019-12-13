import React from "react";
//import loginImg from './logo.svg';
import "./style.css";

import { browserHistory } from "react-router";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onNavigate = e => {
    e.preventDefault();
    // location.reload();

    fetch("http://localhost:5000/login", {
      method: "POST",

      body: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }
    })
      .then(response => response.json())
      .then(serverResponse => console.warn(serverResponse));

    browserHistory.push("/Images");
  };

  render() {
    return (
      <div className="base-contanier">
        <div className="header">login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                name="username"
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                name="password"
                placeholder="password"
              />
            </div>
          </div>
        </div>

        <div className="footer">
          <button type="button" onClick={this.onNavigate} className="btn">
            Log In
          </button>
        </div>
        <div className="registration">
          <Link to={"/Register"}> Register for an account</Link>
        </div>
      </div>
    );
  }
}
