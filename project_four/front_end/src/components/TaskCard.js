import React from "react";
import { Badge } from "evergreen-ui";

class TaskCard extends React.Component {
  getColor = status => {
    switch (status) {
      case "in complete":
        return "neutral";
      case "complete":
        return "green";
    }
  };

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
            <Badge isSolid color={this.getColor(this.props.status)}>
              {status}
            </Badge>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;
