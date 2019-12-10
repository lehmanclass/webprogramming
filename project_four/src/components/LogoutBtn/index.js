import React, { Component } from 'react';
import {
  NavLink
} from 'reactstrap';
import './LogoutBtn.css';

class LogoutBtn extends Component{
  click = () => {
    localStorage.removeItem('token');
  }

  render() {
    return (
      <NavLink onClick={this.click} href='/'>
        Logout
      </NavLink>
    );
  }
}

export default LogoutBtn;
