import React from "react";

class EditGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.goalInfo
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleReasonChange = e => {
    this.setState({ reason: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  handleStatusChange = e => {
    this.setState({ status: e.target.value });
  };

  render() {
    const { goalId, name, description, reason, status } = this.state;
    const validInputs = name.length && description.length && reason.length;
    const updatedBody = { name, description, reason, status };
    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.cancel}>
          X
        </span>
        <div className="modal">
          <div className="edit-goal-container">
            <div>
              <h2>Edit Goal</h2>
            </div>
            <div>
              <p>Goal Title</p>
              <input className="input-view" value={name} onChange={this.handleNameChange} />
            </div>
            <div>
              <p>Reason</p>
              <textarea className="textarea" onChange={this.handleReasonChange}>{reason}</textarea>
            </div>
            <div>
              <p>Description</p>
              <textarea className="textarea" onChange={this.handleDescriptionChange}>
                {description}
              </textarea>
            </div>
            <div className="m-b">
              <label>Status: </label>
              <select value={status} onChange={this.handleStatusChange}>
                <option value="not started">Not started</option>
                <option value="in progress">In progress</option>
                <option value="on hold">On hold</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <button className="btn red m-r" onClick={this.props.cancel}>Cancel</button>
              <button
              className="btn blue"
                onClick={() =>
                  validInputs
                    ? this.props.editGoal(goalId, updatedBody)
                    : alert("All fields are required")
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditGoal;
