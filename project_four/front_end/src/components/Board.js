import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import DraggableGoalCard from "./DraggableGoalCard";
import ViewGoal from "./ViewGoal";
import { Link, Redirect } from "react-router-dom";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: [],
      onHold: [],
      noStarted: [],
      done: [],
      goals: this.props.goals,
      isViewingGoal: false
    };
  }

  componentDidMount() {
    this.organizeGoals();
  }

  viewGoal = goalInfo => {
    this.setState({ isViewingGoal: true, goalInfo });
  };

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

  cancelGoalView = () => this.setState({ isViewingGoal: false });

  displayGoal = () => {
    const { goalInfo } = this.state;
    const { deleteGoal, editGoal, createTask } = this.props;
    return (
      <ViewGoal
        hide={this.cancelGoalView}
        goalId={goalInfo.id}
        name={goalInfo.name}
        reason={goalInfo.reason}
        status={goalInfo.status}
        description={goalInfo.description}
        deleteGoal={deleteGoal}
        editGoal={editGoal}
        createTask={createTask}
      />
    );
  };

  render() {
    const { redirect } = this.props;
    const { isViewingGoal, goalInfo } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="main-wrapper">
        <Nav logout={this.props.logout} />
        <h1 className="header">Goals Board</h1>
        <div className="board-column-container">
          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "no started")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title no-started">No started</h3>
            <div className="board-column-inner-item">
              {this.displayNoStarted()}
            </div>
          </div>

          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "in progress")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title in-progress">In progress</h3>
            <div className="board-column-inner-item">
              {this.displayInProgress()}
            </div>
          </div>
          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "on hold")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title on-hold">On hold</h3>
            <div className="board-column-inner-item">
              {this.displayOnHold()}
            </div>
          </div>
          <div
            className="board-column-item"
            onDrop={e => this.onDrop(e, "done")}
            onDragOver={e => this.onDraggingOver(e)}
          >
            <h3 className="column-title done">Done</h3>
            <div className="board-column-inner-item">{this.displayDone()}</div>
          </div>
        </div>
        {isViewingGoal ? this.displayGoal() : null}
      </div>
    );
  }
}

export default Board;
