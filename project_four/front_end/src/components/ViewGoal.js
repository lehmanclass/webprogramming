import React from "react";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";
import EditGoal from "./EditGoal";
import ViewTask from "./ViewTask";

class ViewGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchTasks: [],
      isCreatingTask: false,
      isEditingGoal: false,
      selectedStatus: this.props.status,
      isViewingTask: false
    };
  }
  componentDidMount() {
    const { goalId } = this.props;
    fetch(`http://localhost:5000/tasks/${goalId}`)
      .then(res => res.json())
      .then(data => this.setState({ fetchTasks: data }));
  }

  displayTasks = () => {
    const { fetchTasks } = this.state;
    const container = [];
    fetchTasks.forEach(task => {
      container.push(
        <TaskCard
          viewTask={this.viewTask}
          key={task.id}
          title={task.name}
          description={task.description}
          status={task.status}
        />
      );
    });

    if (!container.length) {
      return <p>Sorry, there are not tasks for this goal</p>;
    }

    return container;
  };

  createTask = () => {
    this.setState({ isCreatingTask: true });
  };

  viewTask = (taskInfo) => this.setState({ isViewingTask: true, taskInfo });

  editGoal = () => this.setState({ isEditingGoal: true });

  cancelGoalEdit = () => this.setState({ isEditingGoal: false });

  cancelTaskCreation = () => this.setState({ isCreatingTask: false });

  handleStatusChange = e => {
    this.setState({ selectedStatus: e.target.value });
  };

  render() {
    const {
      name,
      reason,
      description,
      deleteGoal,
      status,
      goalId,
      editGoal,
      createTask
    } = this.props;
    const {
      isCreatingTask,
      isEditingGoal,
      selectedStatus,
      isViewingTask
    } = this.state;

    if (isViewingTask) {
      return <ViewTask taskInfo={this.state.taskInfo}/>;
    }

    if (isCreatingTask) {
      return (
        <CreateTask
          createTask={createTask}
          goalId={goalId}
          cancel={this.cancelTaskCreation}
        />
      );
    }

    if (isEditingGoal) {
      return (
        <EditGoal
          editGoal={editGoal}
          goalInfo={{ goalId, name, status, reason, description }}
          cancel={this.cancelGoalEdit}
        />
      );
    }

    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.hide}>
          X
        </span>

        <div className="view-goal">
          <div>
            <h2>{name}</h2>
            <p>{status}</p>
          </div>

          <div>
            <button onClick={this.createTask}>Add Task</button>
            <button onClick={this.editGoal}>Edit Goal</button>
            {/* <select value={selectedStatus} onChange={this.handleStatusChange}>
              <option value="not started">Not started</option>
              <option value="in progress">In progress</option>
              <option value="on hold">On hold</option>
              <option value="done">Done</option>
            </select> */}
            <button onClick={() => deleteGoal(goalId)}>Delete</button>
          </div>

          <div>
            <h3>Why I want to do it</h3>
            <p>{reason}</p>

            <h3>Descriptions</h3>
            <p>{description}</p>
          </div>

          <div>
            <h3>Daily Tasks</h3>
            <div>{this.displayTasks()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewGoal;
