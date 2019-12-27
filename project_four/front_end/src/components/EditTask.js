import React from "react";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.taskInfo
    };
  }
  handleNameChange = e => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleStatusChange = e => {
    this.setState({ status: e.target.value });
  };

  render() {
    const { taskInfo, save } = this.props;
    const { title, description, status } = this.state;
    const validInputs = title.length && description.length && status.length;
    const updatedBody = { title, description, status };

    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.cancelEditTask}>
          X
        </span>
        <div className="modal">
          <div className="edit-goal-container">
            <div>
              <h2>Edit Task</h2>
            </div>
            <div>
              <p>Task Title</p>
              <input
                className="input-view"
                value={title}
                onChange={this.handleNameChange}
              />
            </div>

            <div>
              <p>Description</p>
              <textarea
                className="textarea"
                onChange={this.handleDescriptionChange}
              >
                {description}
              </textarea>
            </div>
            <div className="m-b">
              <label>Status: </label>
              <select value={status} onChange={this.handleStatusChange}>
                <option value="in complete">In complete</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <div>
              <button
                className="btn red m-r"
                onClick={this.props.cancelEditTask}
              >
                Cancel
              </button>
              <button
                className="btn blue"
                onClick={() =>
                  validInputs
                    ? this.props.save(taskInfo.taskId, updatedBody)
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

export default EditTask;
