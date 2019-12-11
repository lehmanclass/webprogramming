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
    this.getTasks();
  }

  getTasks = () => {
    const { goalId } = this.props;
    fetch(`http://localhost:5000/tasks/${goalId}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          fetchTasks: data,
          isViewingTask: false,
          isCreatingTask: false
        })
      );
  };

  editTask = (taskId, newBody) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        taskId,
        newBody
      })
    }).then(res => {
      if (res.status == 200) {
        alert("Save!");
        this.getTasks();
      }
    });
  };

  deleteTask = taskId => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status == 200) {
          alert("task deleted");
          this.getTasks();
        }
      })
      .catch(e => alert("Error"));
  };

  displayTasks = () => {
    const { fetchTasks } = this.state;
    const container = [];
    fetchTasks.forEach(task => {
      container.push(
        <TaskCard
          viewTask={this.viewTask}
          key={task.id}
          taskId={task.id}
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

  creatingTask = () => {
    this.setState({ isCreatingTask: true });
  };

  createTask = (goalId, taskBody) => {
    fetch(`http://localhost:5000/createTask/${goalId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskBody)
    }).then(res => {
      if (res.status == 200) {
        alert("It worked");
        this.getTasks();
      }
    });
  };

  viewTask = taskInfo => this.setState({ isViewingTask: true, taskInfo });

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
      editGoal
    } = this.props;
    const {
      isCreatingTask,
      isEditingGoal,
      selectedStatus,
      isViewingTask
    } = this.state;

    if (isViewingTask) {
      return (
        <ViewTask
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          taskInfo={this.state.taskInfo}
        />
      );
    }

    if (isCreatingTask) {
      return (
        <CreateTask
          refreshTasks={this.getTasks}
          createTask={this.createTask}
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
            <button onClick={this.creatingTask}>Add Task</button>
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
