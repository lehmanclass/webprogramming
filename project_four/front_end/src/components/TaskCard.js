import React from "react";

class TaskCard extends React.Component {
  render() {
    return (
      <div className="card-container">
        <div className="task-title-container">
          <h3 className="task-title">{this.props.title}</h3>
        </div>
        <div className="status-container">
          <div>
            <span>{this.props.status}</span>
          </div>
          <select>
            <option value="not_started">Not started</option>
            <option value="in_progress">In progress</option>
            <option value="on_hold">On hold</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    );
  }
}

export default TaskCard;
