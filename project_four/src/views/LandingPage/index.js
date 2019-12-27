import React, { Component } from 'react';
import './LandingPage.css';
import AuthWindow from '../../components/AuthWindow';

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage p-3 d-flex align-items-center">
        <AuthWindow/>
      </div>
    );
  }
}

export default LandingPage;
