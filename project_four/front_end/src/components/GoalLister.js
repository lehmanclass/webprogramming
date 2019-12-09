import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import CreateGoal from "./CreateGoal";
import { Link, Redirect } from "react-router-dom";
import ViewGoal from './ViewGoal';

class GoalLister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createGoal: false,
      viewGoal: false,
     
    };
  }
  displayGoals = () => {
    const { goals } = this.props;
    if (goals.length) {
      return goals.map(goal => (
        <GoalCard handleClick={this.viewGoal} key={goal.id} title={goal.name} status={goal.status} />
      ));
    }

    return <h1>Sorry, not goals</h1>;
  };

  addGoal = () => {
    this.setState({ createGoal: true });
  };

  viewGoal = () => this.setState({viewGoal:true});

  hideModal = () => {
    this.setState({viewGoal: false, createGoal: false})
  }

  createGoal = (goalInfo) => {
    console.log(goalInfo)
  }

  render() {
    const { createGoal, viewGoal } = this.state;
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
        {createGoal ? <CreateGoal hide={this.hideModal} createGoal={this.createGoal}/> : null}
        {viewGoal ? <ViewGoal hide={this.hideModal}/> : null}
      </div>
    );
  }
}

export default GoalLister;
