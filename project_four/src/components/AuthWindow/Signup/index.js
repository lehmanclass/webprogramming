import React, { Component } from 'react';
import './SignUp.css';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { auth } from '../../../api';
import { getToken } from '../../../helpers';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confPass: '',
      msg: null,
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confPass,
    } = this.state;

    auth.signup({name, email, password, confPass})
      .then(payload => {
        if ('msg' in payload) {
          this.setState({
            msg: payload.msg,
            error: true
          });
          return;
        }

        if ('token' in payload) {
          localStorage.setItem('token', payload.token);
          this.forceUpdate();
        }
      });
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  clearError() {
    this.setState({
      msg: null,
      error: false
    });
  }

  render() {
    const {
      name,
      email,
      password,
      confPass,
      msg,
      error,
    } = this.state;

    if (getToken()) {
      return <Redirect to="/profile"/>
    }

    return (
      <Form className="SignUp" onSubmit={this.handleSubmit}>
        <Alert color="danger"isOpen={error} toggle={this.clearError}>{msg}</Alert>
        <FormGroup>
          <Label className="auth-label" for="name"><strong>Full name:</strong></Label>
          <Input className="radius-0" type="text" name="name" id="name" value={name} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label className="auth-label" for="email"><strong>Email:</strong></Label>
          <Input className="radius-0" type="email" name="email" id="email" value={email} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label className="auth-label" for="password"><strong>Password:</strong></Label>
          <Input className="radius-0" type="password" name="password" id="password" value={password} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label className="auth-label" for="confPass"><strong>Confirm Password:</strong></Label>
          <Input className="radius-0" type="password" name="confPass" id="confPass" value={confPass} onChange={this.handleChange}/>
        </FormGroup>
        <Button className="auth-btn">Submit</Button>
      </Form>
    );
  }
}

export default SignUp;
