import React from "react";
import { Link } from "react-router-dom";
import { SearchInput, Icon } from "evergreen-ui";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewingUser: false
    };
  }
  getLinks = () => {
    let user = window.localStorage.getItem("userSession");
    const { isViewingUser } = this.state;

    if (user) {
      user = JSON.parse(user);
      return (
        <ul className="right-nav">
          <Link to="/">Home</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/board">Board</Link>
          <Icon
            icon="user"
            color="white"
            onMouseEnter={() => this.setState({ isViewingUser: true })}
            onMouseLeave={() => this.setState({ isViewingUser: false })}
          />

          {isViewingUser ? (
            <div className="view-user-container">
              <p>{user.user_name}</p>
            </div>
          ) : null}

          <a href="#" onClick={() => this.props.logout()}>
            LogOut
          </a>
        </ul>
      );
    }

    return (
      <ul className="right-nav">
        <Link to="/">Home</Link>
        <Link to="/login">LogIn</Link>
        <Link to="/register">Register</Link>
      </ul>
    );
  };
  render() {
    return (
      <div className="main-nav">
        <ul className="left-nav">
          <Link to="/">BUILD YOUR FUTURE TODAY</Link>
        </ul>
        {this.getLinks()}
      </div>
    );
  }
}

export default Nav;
