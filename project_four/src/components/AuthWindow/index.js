import React, { Component } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';
import './AuthWindow.css';
import SignUp from './Signup';
import SignIn from './SignIn';

class AuthWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true
    }
  }

  handleClick(window) {
    const active = this.state.active;

    if (
      (window === 'signup' && active) ||
      (window === 'signin' && !active)
    ) {
      this.setState({
        active: !active
      });
    }
  }

  render() {
    const { active } = this.state;

    return (
      <Container className="AuthWindow" style={{height: '440px'}}>
        <div className='app-title position-absolute'><strong>TODO-APP</strong></div>
        <Row className='auth-container'>
          <Nav tabs className="d-flex" style={{width: '100%'}}>
            <NavItem className="text-align-center flex-1">
              <NavLink onClick={() => this.handleClick('signin')} active={active}>Sign In
                {active &&
                  <div className='m-auto active-indicator'></div>
                }
              </NavLink>
            </NavItem>
            <NavItem className="text-align-center flex-1">
              <NavLink onClick={() => this.handleClick('signup')} active={!active}>Sign Up
                {!active &&
                  <div className='m-auto active-indicator'></div>
                }
              </NavLink>
            </NavItem>
          </Nav>
          <div className="form-container d-flex">
            <div className='auth-form flex-1'>
              {active && <SignIn/>}
            </div>
            <div className='auth-form flex-1'>
              {!active && <SignUp/>}
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default AuthWindow;
