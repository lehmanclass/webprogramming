import React from "react";

class GoalCard extends React.Component {
  render() {
    return (
      <div className="card-container">
        <div className="goal-title-container">
          <h3 className="goal-title">{this.props.title}</h3>
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

export default GoalCard;
