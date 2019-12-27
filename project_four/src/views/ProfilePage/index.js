import React, { Component } from 'react';
import './ProfilePage.css';
import {
  Redirect
} from 'react-router-dom';
import { getToken } from '../../helpers';
import CustomNavbar from '../../components/CustomNavbar';
import { section } from '../../api';
import Section from '../../components/Section';

class ProfilePage extends Component {
  state = {
    token: getToken(),
    creating: false,
    listName: '',
    sections: []
  };

  componentDidMount() {
    if (this.state.token) {
      section.getSections()
        .then(payload => {
          if ('msg' in payload) {
            localStorage.removeItem('token');
            this.setState({ token: null });
            return;
          }

          const sections = payload.sections;

          this.setState({ sections });
        });
    }
  }

  render() {
    const {
      token,
      sections
    } = this.state;
    
    if (!token) {
      return <Redirect to="/"/>
    }

    return (
      <div className="ProfilePage">
        <CustomNavbar />
        <div className="profile-container p-2">
          {sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProfilePage;
