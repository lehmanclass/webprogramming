import React from "react";
//import loginImg from './logo.svg';
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      datasent: ""
    };
    // this.onChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    event.preventDefault();
    //const {name, password, email } = this.state;
    fetch("http://localhost:5000/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }
    })
      .then(response => response.json())
      .then(output => console.warn(output)); //(this.state))

    alert(
      "Your username is: " +
        this.state.username +
        " \n Your email is: " +
        this.state.email +
        " You are registered now"
    );
  };

  // handleClick = e => {
  //     axios
  //       .post('/new', {
  //         name: this.state.name,
  //         password: this.state.password,
  //         email: this.state.email
  //       })
  //       .then(res => {
  //         this.setState({ name: res.data.result});
  //       });
  //   };

  render() {
    const { name, password, email } = this.state;
    return (
      <div className="base-contanier">
        <div className="header">Register</div>
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
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input
                type="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                name="email"
                placeholder="email"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" onClick={this.handleClick} className="btn">
            Register
          </button>
        </div>
        <div className="registration">
          <Link to={"/Login"}> Log in</Link>
        </div>
      </div>
    );
  }
}
