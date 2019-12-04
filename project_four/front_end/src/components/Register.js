import React from "react";
import Nav from "./Nav";

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

    return (
      <div>
        <Nav />
        <div className="login-register-form">
          <div>
            <input
              placeholder="username"
              value={username}
              onChange={this.handleUsername}
            />
            <input
              placeholder="email"
              value={email}
              onChange={this.handleEmail}
            />
            <input
              placeholder="password"
              value={password}
              onChange={this.handlePassword}
            />
            <button onClick={() => isValid ? this.props.registerUser(this.state) : alert("Checks inputs")}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
