import React from "react";

class TaskCard extends React.Component {
  render() {
    const { taskId, status, title, description } = this.props;
    return (
      <div
        onClick={() =>
          this.props.viewTask({ taskId, status, title, description })
        }
        className="card-container"
      >
        <div className="task-title-container">
          <h3 className="task-title">{title}</h3>
        </div>
        <div className="status-container">
          <div>
            <span>{status}</span>
          </div>
          {/* <select>
            <option value="">status</option>
            <option value="in complete">in complete</option>
            <option value="complete">complete</option>
          </select> */}
        </div>
      </div>
    );
  }
}

export default TaskCard;
