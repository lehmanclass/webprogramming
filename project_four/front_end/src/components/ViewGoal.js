import React from "react";

class ViewGoal extends React.Component {
  render() {
    const { name, reason, description } = this.props;
    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.hide}>
          X
        </span>

        <div className="view-goal">
          <div>
            <h2>{name}</h2>
          </div>

          <div>
            <button>Add Task</button>
            <button>Edit Goal</button>
            <select>
              <option>Status</option>
              <option>Not started</option>
              <option>In progress</option>
              <option>On hold</option>
              <option>Complete</option>
            </select>
            <button>Delete</button>
          </div>

          <div>
            <h3>Why I want to do it</h3>
            <p>
              {reason}
            </p>

            <h3>Descriptions</h3>
            <p>
             {description}
            </p>
          </div>

          <div>
            <h3>Daily Tasks</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewGoal;
