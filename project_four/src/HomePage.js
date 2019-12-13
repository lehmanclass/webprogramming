import React from 'react';
import './HomePage.css';
import {
  Row,
  Col,
  Layout
} from 'antd';
import background_mh from './images/background_mh.jpg'
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';
import PositiveBoardContainer from './components/PositiveBoardContainer';
import EmailForm from './components/EmailForm';

function HomePage() {
  const { Header, Content, Footer } = Layout;
  
  return (
    <Row className="HomePage">
      <Col xs={0} sm={0} md={4} xl={6}></Col>
      <Col className="color-primary main-container" xs={24} sm={24} md={16} xl={12}>
        <div>
          <Header className="position-relative">
            <Navbar/>
            <img src={background_mh} alt='mental health' width="100%"/>
          </Header>
          <Content style={{background: 'white'}}>
            <CardContainer/>
            <PositiveBoardContainer/>
            <EmailForm/>
          </Content>
          <Footer>
            <div className="footer-title">Footer</div>
          </Footer>
        </div>
      </Col>
      <Col xs={0} sm={0} md={4} xl={6}></Col>
    </Row>
  );
}

export default HomePage;