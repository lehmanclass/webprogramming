import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

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
    const isValid = username &&  password;

    return (
      <div>
        <Nav />
        <div className="login-register-form">
          <div className="inputs-container">
            <div className="inner-input-container">
              <input placeholder="username" value={username} onChange={this.handleUsername}/>
            </div>

            <div className="inner-input-container">
              <input placeholder="password" onChange={this.handlePassword}/>
            </div>

            <div className="inner-input-container">
              <button
                onClick={() =>
                  isValid
                    ? this.props.login(this.state)
                    : alert("Checks inputs")
                }
              >
                LogIn
              </button>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
