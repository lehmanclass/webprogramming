import React from "react";
import Nav from "./Nav";
import sideImage from "../assets/home.png";
import Footer from "./Footer";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav logout={this.props.logout} />
        <div className="home-welcome-section">
          <div className="home-text-container">
            <h1 className="">Build Your Future Today</h1>
            <p className="welcome-text">
              Use our free platform to manage and be accountable with your goals{" "}
            </p>
            <a href="#about" className="home-btn btn blue">
              Learn How
            </a>
          </div>
          <div className="home-img-container">
            <img src={sideImage} alt="" />
          </div>
        </div>

        <div id="mission" className="mission-container">
          <h2 className="section-title mission-title">Our Mission</h2>
          <div className="mission-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>

        <div id="about" className="about-container">
          <h2 className="section-title section-title-about">How it Works ?</h2>
          <ul className="about-steps">
            <li>Create Goals</li>
            <li>Create Daily Tasks for those goals</li>
            <li>Track Your Progress</li>
            <li>Do Your Daily Tasks</li>
            <li>Wow! You Have Become a High Performance Person</li>
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
