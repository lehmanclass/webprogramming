import React from "react";
import TaskCard from "./TaskCard";

class ViewGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchTasks: []
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
        <TaskCard key={task.id} title={task.name} status={task.status} />
      );
    });

    if(!container.length){
       return <p>Sorry, there are not tasks for this goal</p>
    }

    return container;
  };

  render() {
    const { name, reason, description } = this.props;
    return (
      <div className="overlay">
        <span className="closeModal" onClick={this.props.hide}>
          X
        </span>

        <div className="view-goal">
          <div>
            <h2>{name}</h2>
          </div>

          <div>
            <button>Add Task</button>
            <button>Edit Goal</button>
            <select>
              <option>Status</option>
              <option>Not started</option>
              <option>In progress</option>
              <option>On hold</option>
              <option>Complete</option>
            </select>
            <button>Delete</button>
          </div>

          <div>
            <h3>Why I want to do it</h3>
            <p>{reason}</p>

            <h3>Descriptions</h3>
            <p>{description}</p>
          </div>

          <div>
            <h3>Daily Tasks</h3>
            <div>
              {this.displayTasks()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewGoal;
