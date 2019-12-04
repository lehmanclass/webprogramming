import React from "react";
import Nav from "./Nav";
import TaskCard from "./TaskCard";

class TaskLister extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <h1>TaskLister</h1>
        <TaskCard title="Do Exercise" status="No started" />
      </div>
    );
  }
}

export default TaskLister;
