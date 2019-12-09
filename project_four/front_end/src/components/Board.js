import React from "react";
import Nav from "./Nav";

class Board extends React.Component {
  render() {
    return (
      <div>
        <Nav logout={this.props.logout} />
        <h1>Board</h1>
        <div className="board-column-container">
          <div className="board-column-item">
            <h3 className="column-title">Not started</h3>
            <div className="board-column-inner-item"></div>
          </div>

          <div className="board-column-item">
            <h3 className="column-title">In progress</h3>
            <div className="board-column-inner-item"></div>
          </div>
          <div className="board-column-item">
            <h3 className="column-title">On hold</h3>
            <div className="board-column-inner-item"></div>
          </div>
          <div className="board-column-item">
            <h3 className="column-title">Done</h3>
            <div className="board-column-inner-item"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
