import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import CreateGoal from "./CreateGoal";
import { Link, Redirect } from "react-router-dom";

class GoalLister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createGoal: false
    };
  }
  displayGoals = () => {
    const { goals } = this.props;
    if (goals.length) {
      return goals.map(goal => (
        <GoalCard key={goal.id} title={goal.name} status={goal.status} />
      ));
    }

    return <h1>Sorry, not goals</h1>;
  };

  addGoal = () => {
    this.setState({ createGoal: true });
  };

  render() {
    const { createGoal } = this.state;
    const { redirect } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Nav logout={this.props.logout} />
        <h1>GoalLister</h1>
        <button onClick={this.addGoal}>Create Goal</button>
        {this.displayGoals()}
        {createGoal ? <CreateGoal /> : null}
      </div>
    );
  }
}

export default GoalLister;
