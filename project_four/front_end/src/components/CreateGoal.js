import React from "react";
import { STATUS } from "../constants";

class CreateGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      reason: "",
      description: "",
      status: STATUS.NO_STARTED
    };
  }

  handleName = e => this.setState({ name: e.target.value });

  handleReason = e => this.setState({ reason: e.target.value });

  handleDescription = e => this.setState({ description: e.target.value });

  submit = () => {};

  render() {
    const { name, reason, description } = this.state;
    const validInputs = name.length && reason.length && description.length;

    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.hide}>
          X
        </span>
        <div className="create-goal-container modal">
          <div>
            <h2>Create Goal</h2>
          </div>
          <div className="create-goal-inputs-container">
            <div>
              <p>Name</p>
              <input
                className="input-view"
                value={name}
                onChange={this.handleName}
                placeholder="name"
              />
            </div>
            <div>
              <p>What is your motivation to accomplish this goal?</p>
              <div>
                <textarea
                  className="textarea"
                  value={reason}
                  onChange={this.handleReason}
                ></textarea>
              </div>
            </div>
            <div>
              <p>Description</p>
              <div>
                <textarea
                  className="textarea"
                  value={description}
                  onChange={this.handleDescription}
                ></textarea>
              </div>
            </div>

            <button
              className="btn blue"
              onClick={() =>
                validInputs
                  ? this.props.createGoal(this.state)
                  : alert("All fields are required!")
              }
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGoal;
