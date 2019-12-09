import React from "react";

class TaskCard extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.viewTask()} className="card-container">
        <div className="task-title-container">
          <h3 className="task-title">{this.props.title}</h3>
        </div>
        <div className="status-container">
          <div>
            <span>{this.props.status}</span>
          </div>
          <select>
            <option value="">status</option>
            <option value="in complete">in complete</option>
            <option value="complete">complete</option>
          </select>
        </div>
      </div>
    );
  }
}

export default TaskCard;
