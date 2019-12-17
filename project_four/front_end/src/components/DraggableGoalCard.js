import React from "react";

class DraggableGoalCard extends React.Component {
  render() {
    const {
      onDragStart,
      goalId,
      name,
      description,
      reason,
      status
    } = this.props;
    const goalInfo = { goalId, name, description, reason, status };
    return (
      <div
        className="dgg-card-container"
        onClick={ this.props.handleClick }
        onDragStart={e => onDragStart(e, JSON.stringify(goalInfo))}
        draggable
      >
        <div className="dgg-goal-title-container">
          <h3 className="dgg-goal-title">{this.props.name}</h3>
        </div>
      </div>
    );
  }
}

export default DraggableGoalCard;
