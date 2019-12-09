import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import CreateGoal from "./CreateGoal";
import { Link, Redirect } from "react-router-dom";
import ViewGoal from "./ViewGoal";

class GoalLister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreatingGoal: false,
      isViewingGoal: false,
      goalInfo: ""
    };
  }

  displayGoals = () => {
    const { goals } = this.props;
    if (goals.length) {
      return goals.map(goal => (
        <GoalCard
          handleClick={() => this.viewGoal(goal)}
          key={goal.id}
          title={goal.name}
          status={goal.status}
        />
      ));
    }

    return <h1>Sorry, not goals</h1>;
  };

  addGoal = () => {
    this.setState({ isCreatingGoal: true });
  };

  viewGoal = goalInfo => {
    this.setState({ isViewingGoal: true, goalInfo });
  };

  hideModal = () => {
    this.setState({
      isViewingGoal: false,
      isCreatingGoal: false,
      goalInfo: ""
    });
  };

  submitGoalInfo = goalInfo => {
    this.hideModal();
    this.props.createGoal(goalInfo);
  };

  displayGoal = () => {
    const { goalInfo } = this.state;
    return (
      <ViewGoal
        goalId={goalInfo.id}
        name={goalInfo.name}
        reason={goalInfo.reason}
        description={goalInfo.description}
        hide={this.hideModal}
      />
    );
  };

  render() {
    const { isCreatingGoal, isViewingGoal, goalInfo } = this.state;
    const { redirect, createGoal, tasks } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Nav logout={this.props.logout} />
        <h1>GoalLister</h1>
        <button onClick={this.addGoal}>Create Goal</button>
        {this.displayGoals()}
        {isCreatingGoal ? (
          <CreateGoal hide={this.hideModal} createGoal={this.submitGoalInfo} />
        ) : null}
        {isViewingGoal ? this.displayGoal() : null}
      </div>
    );
  }
}

export default GoalLister;
