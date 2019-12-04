import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Board from "./components/Board";
import EditGoal from "./components/EditGoal";
import EditTask from "./components/EditTask";
import GoalLister from "./components/GoalLister";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskLister from "./components/TaskLister";
import Nav from "./components/Nav";
import Activity from "./components/Activity";
import NoFound from "./components/NoFoundPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleLogin = () => {};

  registerUser = userInfo => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username:'test', email:'test@gmail.com', password:'secure'})
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
  };

  createGoal = () => {};

  createTask = () => {};

  editGoal = () => {};

  editTask = () => {};

  render() {
    const BoardComponent = () => <Board name="props" />;
    const EditGoalComponent = () => <EditGoal name="props" />;
    const EditTaskComponent = () => <EditTask name="props" />;
    const GoalListerComponent = () => <GoalLister name="props" />;
    const LoginComponent = () => <Login name="props" />;
    const TaskListerComponent = () => <TaskLister name="props" />;
    const NotFound = () => <NoFound name="props" />;
    const HomeComponent = () => <Activity name="props" />;
    const RegisterComponent = () => <Register registerUser={this.registerUser} />;

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
          <Route exact path="/register" component={RegisterComponent} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
