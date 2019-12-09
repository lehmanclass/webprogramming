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
      isViewingGoal: false
    };
  }
  displayGoals = () => {
    const { goals } = this.props;
    if (goals.length) {
      return goals.map(goal => (
        <GoalCard
          handleClick={this.viewGoal}
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

  viewGoal = () => this.setState({ viewGoal: true });

  hideModal = () => {
    this.setState({ isViewingGoal: false, isCreatingGoal: false });
  };

  submitGoalInfo = goalInfo => {
    this.hideModal();
    this.props.createGoal(goalInfo);
  };

  render() {
    const { isCreatingGoal, isViewingGoal } = this.state;
    const { redirect, createGoal } = this.props;

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
        {isViewingGoal ? <ViewGoal hide={this.hideModal} /> : null}
      </div>
    );
  }
}

export default GoalLister;
