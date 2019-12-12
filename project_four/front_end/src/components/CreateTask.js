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
    const { goalId } = this.props;
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
                className="input-view"
                value={name}
                onChange={this.handleName}
                placeholder="name"
              />
            </div>

            <div>
              <p>Description</p>
              <textarea
                className="textarea m-b"
                value={description}
                onChange={this.handleDescription}
              ></textarea>
            </div>
            <button className="btn red m-r" onClick={this.props.cancel}>
              Cancel
            </button>

            <button
              className="btn blue"
              onClick={() =>
                validInputs
                  ? this.props.createTask(goalId, this.state)
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

export default CreateTask;
