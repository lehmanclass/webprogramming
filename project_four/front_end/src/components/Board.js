import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import DraggableGoalCard from "./DraggableGoalCard";
import ViewGoal from "./ViewGoal";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: [],
      onHold: [],
      noStarted: [],
      done: [],
      goals: this.props.goals
    };
  }

  componentDidMount() {
    this.organizeGoals();
  }

  filterGoal = status => {
    const { goals } = this.state;
    return goals.filter(goal => goal.status == status);
  };

  organizeGoals = () => {
    const inProgress = this.filterGoal("in progress");
    const onHold = this.filterGoal("on hold");
    const noStarted = this.filterGoal("no started");
    const done = this.filterGoal("done");
    this.setState({ inProgress, onHold, noStarted, done });
  };

  displayInProgress = () => {
    const { inProgress } = this.state;

    if (inProgress.length) {
      return inProgress.map(goal => (
        <DraggableGoalCard
          handleClick={() => this.viewGoal(goal)}
          key={goal.id}
          name={goal.name}
          status={goal.status}
          goalId={goal.id}
          description={goal.description}
          reason={goal.reason}
          onDragStart={this.onDragStart}
        />
      ));
    }
  };

  displayOnHold = () => {
    const { onHold } = this.state;

    if (onHold.length) {
      return onHold.map(goal => (
        <DraggableGoalCard
          handleClick={() => this.viewGoal(goal)}
          key={goal.id}
          name={goal.name}
          status={goal.status}
          goalId={goal.id}
          description={goal.description}
          reason={goal.reason}
          onDragStart={this.onDragStart}
        />
      ));
    }
  };

  displayNoStarted = () => {
    const { noStarted } = this.state;

    if (noStarted.length) {
      return noStarted.map(goal => (
        <DraggableGoalCard
          handleClick={() => this.viewGoal(goal)}
          key={goal.id}
          name={goal.name}
          status={goal.status}
          goalId={goal.id}
          description={goal.description}
          reason={goal.reason}
          onDragStart={this.onDragStart}
        />
      ));
    }
  };

  displayDone = () => {
    const { done } = this.state;

    if (done.length) {
      return done.map(goal => (
        <DraggableGoalCard
          handleClick={() => this.viewGoal(goal)}
          key={goal.id}
          goalId={goal.id}
          onDragStart={this.onDragStart}
          name={goal.name}
          description={goal.description}
          reason={goal.reason}
          status={goal.status}
        />
      ));
    }
  };

  onDragStart = (e, goalInfo) => {
    e.dataTransfer.setData("goalInfo", goalInfo);
  };

  onDraggingOver = e => {
    e.preventDefault();
  };

  onDrop = (e, status) => {
    const { editGoal } = this.props;
    const goalInfo = JSON.parse(e.dataTransfer.getData("goalInfo"));
    goalInfo.status = status;
    editGoal(goalInfo.goalId, goalInfo);
  };

  render() {
    return (
      <div>
        <Nav logout={this.props.logout} />
        <h1>Board</h1>
        <div className="board-column-container">
          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "no started")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title">No started</h3>
            <div className="board-column-inner-item">
              {this.displayNoStarted()}
            </div>
          </div>

          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "in progress")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title">In progress</h3>
            <div className="board-column-inner-item">
              {this.displayInProgress()}
            </div>
          </div>
          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "on hold")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title">On hold</h3>
            <div className="board-column-inner-item">
              {this.displayOnHold()}
            </div>
          </div>
          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "done")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title">Done</h3>
            <div className="board-column-inner-item">{this.displayDone()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
