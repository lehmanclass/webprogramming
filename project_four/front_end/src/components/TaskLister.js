import React from "react";
import Nav from "./Nav";
import TaskCard from "./TaskCard";

class TaskLister extends React.Component {
  componentDidMount(){
    this.props.getTasks();
  }
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
