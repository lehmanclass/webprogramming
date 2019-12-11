import React from "react";

class ViewTask extends React.Component {
  render() {
    const { taskInfo } = this.props;
    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.hide}>
          X
        </span>
        <div className="view-goal">
          <div>
            <h2>{taskInfo.title}</h2>
            <p>{taskInfo.status}</p>
          </div>

          <div>
            <button>Edit</button>
            {/* <select>
            <option>Status</option>
            <option>Not started</option>
            <option>In progress</option>
            <option>On hold</option>
            <option>Complete</option>
          </select> */}
            <button>Delete</button>
          </div>

          <div>
            <h3>Descriptions</h3>
            <p>
             {taskInfo.description}
            </p>
          </div>

          <div>
            <h3>Goal to Accomplish</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTask;
