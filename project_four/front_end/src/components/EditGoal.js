import React from "react";

class EditGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: this.props.goalInfo.status
    };
  }

  handleStatusChange = e => {
    this.setState({ selectedStatus: e.target.value });
  };

  render() {
    const { goalInfo } = this.props;
    const {selectedStatus}= this.state;
    return (
      <div className="overlay">
        <div className="modal">
          <div className="edit-goal-container">
            <div>
              <h2>Edit Goal</h2>
            </div>
            <div>
              <p>Goal Title</p>
              <input value={goalInfo.name} />
            </div>
            <div>
              <p>Reason</p>
              <textarea>{goalInfo.reason}</textarea>
            </div>
            <div>
              <p>Description</p>
              <textarea>{goalInfo.description}</textarea>
            </div>
            <div>
              <p>Status</p>
              <select value={selectedStatus} onChange={this.handleStatusChange}>
                <option value="not started">Not started</option>
                <option value="in progress">In progress</option>
                <option value="on hold">On hold</option>
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
