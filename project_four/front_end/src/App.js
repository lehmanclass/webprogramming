import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Board from "./components/Board";
import EditGoal from "./components/EditGoal";
import EditTask from "./components/EditTask";
import GoalLister from "./components/GoalLister";
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import TaskLister from "./components/TaskLister";
import Nav from "./components/Nav";
import Activity from './components/Activity';

class App extends React.Component {
  render() {
    const BoardComponent = () => <Board name="props" />;
    const EditGoalComponent = () => <EditGoal name="props" />;
    const EditTaskComponent = () => <EditTask name="props" />;
    const GoalListerComponent = () => <GoalLister name="props" />;
    const LoginComponent = () => <Login name="props" />;
    const LogOutComponent = () => <LogOut name="props" />;
    const TaskListerComponent = () => <TaskLister name="props" />;
    const NotFound = () => <Nav name="props" />;
    const HomeComponent = () => <Activity name="props" />;

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/tasks" component={TaskListerComponent} />
          <Route exact path="/editTask" component={EditTaskComponent} />
          <Route exact path="/goals" component={GoalListerComponent} />
          <Route exact path="/editGoal" component={EditGoalComponent} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/board" component={BoardComponent} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
