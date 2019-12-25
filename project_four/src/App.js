import React, { Component } from "react";
import "./App.css";
import BookingDates from './BookingDates'
import SignUpForm from './SignUpForm'


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      sentPassword: "",
      formErrors: false,
      isLogin: true,
      isBooking: false,
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this)

    this.routeToSignUp = this.routeToSignUp.bind(this)
  }

  routeToSignUp() {
    let path = `/SignUpForm`;
    this.props.history.push(path);
  }

  routeChange() {
    let path = `/BookingDates`;
    this.props.history.push(path);
  }

  handleSubmit = (e) => {
    const { email, sentPassword } = this.state;
    e.preventDefault();

    // On submit of the form, send a POST request with the data to the server.
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        sentPassword,
      })
    })
      .then((response) => {
        return response.json()
      }).then((body) => {
        if (body.authorized) {
          this.setState({ isBooking: true, isLogin: false, user: body.user })
        }else{
          alert("Invalid Username or Password")
        }
        console.log(body);
      });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange = (e) => {
    this.setState({ sentPassword: e.target.value })
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let { sentPassword, email } = this.state;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        sentPassword =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    //this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors, email, sentPassword, isLogin, isBooking } = this.state;

    if (isLogin) {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Login</h1>
            <form>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input className={formErrors ? "error" : null} placeholder="Email" type="email" name="email" ref="email" value={email} noValidate onChange={this.handleEmailChange} />
                {formErrors && (
                  <span className="errorMessage">{email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input className={formErrors ? "error" : null} placeholder="Password" type="password" name="password" ref="sentPassword" noValidate value={sentPassword} onChange={this.handlePasswordChange} />
                {formErrors && (
                  <span className="errorMessage">{sentPassword}</span>
                )}
              </div>
              <div className="createAccount">
                <button id="submit" type="submit" onClick={this.handleSubmit}>Login</button>
                <small onClick={this.routeToSignUp}>Don't Have an Account?</small>
              </div>
            </form>
          </div>
        </div>
      );

    } else if (isBooking) {
      return <BookingDates />
    }
  }
}

export default App;