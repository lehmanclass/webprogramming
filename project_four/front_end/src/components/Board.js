import React from "react";
import Nav from './Nav';

class Board extends React.Component {
  render() {
    return (
      <div>
        <Nav logout={this.props.logout}/>
        <h1>Board</h1>
      </div>
    );
  }
}

export default Board;
