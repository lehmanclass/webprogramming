import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import CreateGoal from './CreateGoal';

class GoalLister extends React.Component {

  componentDidMount(){
     this.props.getGoals();
  }

  render() {
    return (
      <div>
       <Nav logout={this.props.logout}/>
        <h1>GoalLister</h1>
        <GoalCard title="Get a Job" status="In progress" />
        <CreateGoal />
      </div>
    );
  }
}

export default GoalLister;
