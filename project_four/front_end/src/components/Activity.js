import React from "react";
import Nav from "./Nav";

class Activity extends React.Component {
  render() {
    return (
      <div>
        <Nav logout={this.props.logout} />
        <h1>Activity</h1>
      </div>
    );
  }
}

export default Activity;
