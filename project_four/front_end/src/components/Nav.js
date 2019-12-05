import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    const user = window.localStorage.getItem("userSession");

    return (
      <div className="main-nav">
        <ul className="left-nav">
          <Link to="/">Logo</Link>
        </ul>

        <ul className="right-nav">
          <Link to="/">Activity</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/board">Board</Link>
          <Link to="/tasks">Tasks</Link>
          {user ? (
            <a href="#" onClick={() => this.props.logout()}>
              LogOut
            </a>
          ) : (
            <Link to="/login">LogIn</Link>
          )}
          {user ? null : <Link to="/register">Register</Link>}

          <li>
            <input placeholder="search term" />
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
