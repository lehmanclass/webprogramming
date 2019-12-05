import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";

class GoalLister extends React.Component {

  componentDidMount(){
     this.props.getGoals();
  }

  render() {
    return (
      <div>
        <Nav />
        <h1>GoalLister</h1>
        <GoalCard title="Get a Job" status="In progress" />
      </div>
    );
  }
}

export default GoalLister;
