import React from "react";
import EditTask from './EditTask';

class ViewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingTask: false
    };
  }

  cancelEditTask = () => {
    this.setState({ isEditingTask: false });
  };

  editTask = () => {
    this.setState({ isEditingTask: true });
  };

  render() {
    const { isEditingTask } = this.state;
    const { taskInfo, hide, editTask, deleteTask } = this.props;

    if(isEditingTask){
       return (
         <EditTask save={editTask} taskInfo={taskInfo} cancelEditTask={this.cancelEditTask}/>
       )
    }

    return (
      <div className="overlay">
        <span className="closeModal" onClick={hide}>
          X
        </span>
        <div className="view-goal">
          <div>
            <h2>{taskInfo.title}</h2>
            <p>{taskInfo.status}</p>
          </div>

          <div>
            <button onClick={this.editTask}>Edit</button>
            {/* <select>
            <option>Status</option>
            <option>Not started</option>
            <option>In progress</option>
            <option>On hold</option>
            <option>Complete</option>
          </select> */}
            <button onClick={deleteTask}>Delete</button>
          </div>

          <div>
            <h3>Descriptions</h3>
            <p>{taskInfo.description}</p>
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
