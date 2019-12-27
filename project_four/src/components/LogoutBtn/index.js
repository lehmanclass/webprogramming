import React, { Component } from 'react';
import {
  NavLink,
  Button
} from 'reactstrap';
import './LogoutBtn.css';

class LogoutBtn extends Component{
  click = () => {
    localStorage.removeItem('token');
  }

  render() {
    return (
      <NavLink onClick={this.click} href='/'>
        <Button className='LogoutBtn auth-btn'>Logout</Button>
      </NavLink>
    );
  }
}

export default LogoutBtn;
