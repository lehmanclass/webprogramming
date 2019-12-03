import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <div className="main-nav">
        <ul className="left-nav">
          <li>Logo</li>
        </ul>

        <ul className="right-nav">
          <li>Activity</li>
          <li>Goals</li>
          <li>Tasks</li>
          <li><input placeholder="search term"/></li>
        </ul>
      </div>
    );
  }
}


export default Nav;