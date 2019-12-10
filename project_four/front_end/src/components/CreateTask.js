import React from "react";
import { STATUS } from "../constants";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      status: STATUS.INCOMPLETE
    };
  }

  handleName = e => this.setState({ name: e.target.value });

  handleDescription = e => this.setState({ description: e.target.value });

  submit = () => {};

  render() {
    const { name, description } = this.state;
    const validInputs = name.length && description.length;

    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.hide}>
          X
        </span>
        <div className="create-task-container modal">
          <div>
            <h2>Create Task</h2>
          </div>
          <div className="create-task-inputs-container">
            <div>
              <input
                value={name}
                onChange={this.handleName}
                placeholder="name"
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={this.handleDescription}
              ></textarea>
            </div>

            <button
              onClick={() =>
                validInputs
                  ? this.props.createTask(this.state)
                  : alert("All fields are required!")
              }
            >
              Create
            </button>
            <button onClick={this.props.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTask;
