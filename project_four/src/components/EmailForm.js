import React, { Component } from 'react';
import '../css/EmailForm.css';
import phone_a_friend from '../images/phone_a_friend.jpg';
import { Row, Col, Input, Button } from 'antd';
import { isValid } from '../helper';
import axios from 'axios';

class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleClick() {
    const { name, email, message } = this.state;

    if (name && email && message && isValid(email)) {
      axios.post('/api/email', {name, email, message})
        .then(() => {
          this.setState({
            name: '',
            email: '',
            message: ''
          })
        })
        .catch(({response}) => console.log(response.data.msg));
    }
  }

  render() {
    const { name, email, message } = this.state;
    const { TextArea } = Input;

    return (
      <div className="EmailForm">
        <div className="emailform-top-container">
          <div className="emailform-header">
            <div className="emailform-title">Need to talk to someone?</div>
            <div className="subtitle">Please, reach out to me, or a friend.</div>
          </div>
          <img
            id="form-image"
            src={phone_a_friend}
            alt="phone a friend"
            width="290px"
          />
        </div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={7} className="custom-col-ef">
            <div className="input-label">Name:</div>
            <Input
              className="custom-input"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={7} className="custom-col-ef">
            <div className="input-label">Email:</div>
            <Input
              className="custom-input"
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={14} className="custom-col-ef">
            <div className="input-label">Message:</div>
            <TextArea
              className="custom-textarea"
              rows={6}
              name="message"
              value={message}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Button
          size="large"
          className="custom-button"
          onClick={this.handleClick}
        >Send</Button>
      </div>
    );
  }
}

export default EmailForm;