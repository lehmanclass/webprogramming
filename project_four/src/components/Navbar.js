import React from 'react';
import '../css/Navbar.css';
import { Button } from 'antd';

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="navbar-container">
        <span className="logo">LOGO HERE</span>
        <div className="btns-container">
          <Button>Home</Button>
          <Button>Resources</Button>
          <Button>Contact Us</Button>
        </div>
      </div>
    </div>
  );
}