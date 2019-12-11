import React from "react";


class DraggableGoalCard extends React.Component {
  render() {
      const{onDragStart, goalId} = this.props;
    return (
      <div className="dgg-card-container" onDragStart={(e) => onDragStart(e, goalId)} draggable>
        <div className="dgg-goal-title-container">
          <h3 className="dgg-goal-title">{this.props.title}</h3>
        </div>
        <div className="dgg-status-container">
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

export default DraggableGoalCard;
