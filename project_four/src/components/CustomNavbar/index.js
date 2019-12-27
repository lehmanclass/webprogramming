import React from 'react';
import './CustomNavbar.css';
import {
  Navbar,
  NavbarBrand,
  Nav
} from 'reactstrap';
import LogoutBtn from '../LogoutBtn';

function CustomNavbar() {
  return (
    <Navbar className="CustomNavbar">
      <NavbarBrand className="brand"><strong>TODO-APP</strong></NavbarBrand>
      <Nav></Nav>
      <LogoutBtn/>
    </Navbar>
  );
}

export default CustomNavbar;
