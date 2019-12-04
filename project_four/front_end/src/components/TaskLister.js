import React from "react";
import Nav from './Nav';

class TaskLister extends React.Component {
  render() {
    return (
        <div>
          <Nav />
          <h1>TaskLister</h1>
        </div>
      );
  }
}

export default TaskLister;