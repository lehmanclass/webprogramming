import React from "react";
import { Badge } from "evergreen-ui";

class GoalCard extends React.Component {
  getColor = status => {
    switch (status) {
      case "in progress":
        return "blue";
      case "no started":
        return "neutral";
      case "on hold":
        return "red";
      case "done":
        return "green";
    }
  };

  render() {
    return (
      <div onClick={this.props.handleClick} className="card-container">
        <div className="goal-title-container">
          <h3 className="goal-title">{this.props.title}</h3>
        </div>
        <div className="status-container">
          <div>
            <Badge isSolid color={this.getColor(this.props.status)}>
              {this.props.status}
            </Badge>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalCard;
