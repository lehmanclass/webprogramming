import React from "react";

class EditGoal extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <div className="edit-goal-container">
            <div>
              <h2>Edit Goal</h2>
            </div>
            <div>
              <p>Goal Title</p>
              <input value="goal title" />
            </div>
            <div>
              <p>Reason</p>
              <textarea>Here why you want to do this</textarea>
            </div>
            <div>
              <p>Description</p>
              <textarea>Your description goes here</textarea>
            </div>
            <div>
              <p>Status</p>
              <select>
                <option value="not_started">Not started</option>
                <option value="in_progress">In progress</option>
                <option value="on_hold">On hold</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <button onClick={this.props.cancel}>Cancel</button>
              <button onClick={this.props.save}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditGoal;
