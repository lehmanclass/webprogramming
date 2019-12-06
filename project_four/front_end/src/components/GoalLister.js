import React from "react";
import Nav from "./Nav";
import GoalCard from "./GoalCard";
import CreateGoal from './CreateGoal';
import { Link, Redirect } from "react-router-dom";

class GoalLister extends React.Component {

  displayGoals = () => {
    const {goals} = this.props;
    if(goals.length){
      return  goals.map( goal => <GoalCard key={goal.id} title={goal.name} status={goal.status}/>)
    }

    return <h1>Sorry, not goals</h1>
  }

  render() {

    if(this.props.redirect){
      return <Redirect to="/" />;
    }

    return (
      <div>
       <Nav logout={this.props.logout}/>
        <h1>GoalLister</h1>
        {this.displayGoals()}
        {/* <CreateGoal /> */}
      </div>
    );
  }
}

export default GoalLister;
