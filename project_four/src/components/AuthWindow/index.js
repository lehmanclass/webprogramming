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
      (window === 'signup' && !active) ||
      (window === 'signin' && active)
    ) {
      this.setState({
        active: !active
      });
    }
  }

  render() {
    const {active} = this.state;

    return (
      <Container className="AuthWindow">
        <Row>
          <Nav tabs className="d-flex" style={{width: '100%'}}>
            <NavItem className="text-align-center flex-1">
              <NavLink onClick={() => this.handleClick('signup')} active={active}>SignUp</NavLink>
            </NavItem>
            <NavItem className="text-align-center flex-1">
              <NavLink onClick={() => this.handleClick('signin')} active={!active}>SignIn</NavLink>
            </NavItem>
          </Nav>
          <div className="form-container p-3">
            {active
              ? <SignUp/>
              : <SignIn/>
            }
          </div>
        </Row>
      </Container>
    );
  }
}

export default AuthWindow;
