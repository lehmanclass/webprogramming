import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

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
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    const user = window.localStorage.getItem("userSession");
    if (user) {
      this.setState({ user: JSON.parse(user) });
    }
    // this.getTasks();
    // this.getGoals();
    // this.createTask();
    //this.createGoal();
    //this.updateGoal();
    //this.deleteGoal();
    //this.updateTask();
    //this.deleteTask();
  }

  componentDidUpdate(prevProps) {
    if (this.state.redirect) {
      this.setState({ redirect: false });
    }
  }

  handleLogin = userInfo => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...userInfo })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data });
        window.localStorage.setItem("userSession", JSON.stringify(data));
      })
      .catch(e => {
        alert(e);
      });
  };

  handleLogOut = () => {
    window.localStorage.clear();
    this.setState({ user: null });
  };

  registerUser = userInfo => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...userInfo })
    }).then(res => {
      this.setState({ redirect: true });
    });
  };

  createGoal = userInfo => {
    const mock = {
      user_id: 1,
      description: "more text",
      name: "Testing another Goal",
      status: "in progress"
    };

    fetch("http://localhost:5000/createGoal/1", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mock)
    }).then(res => {});
  };

  getGoals = () => {
    fetch("http://localhost:5000/goals/1")
      .then(res => res.json())
      .then(data => this.setState({ goals: data }));
  };

  getTasks = () => {
    fetch("http://localhost:5000/tasks/1")
      .then(res => res.json())
      .then(data => this.setState({ tasks: data }));
  };

  updateGoal = (goalId) => {
    fetch("http://localhost:5000/goals/1", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({goalId:2, newBody:`name = 'fake', description = 'fuck again'`})
    }).then(res => {});
  }

  updateTask = (taskId) => {
    fetch("http://localhost:5000/tasks/1", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({taskId:2, newBody:`name = 'fake', description = 'fuck again'`})
    }).then(res => {});
  }

  deleteGoal = (goalId) => {
    fetch("http://localhost:5000/goals/2", {
      method: "DELETE",
    }).then(res => {});
  }

  deleteTask = (goalId) => {
    fetch("http://localhost:5000/tasks/1", {
      method: "DELETE",
    }).then(res => {});
  }

  createTask = () => {
    const mock = {
      goal_id: 1,
      description: "more text",
      name: "Testing another Task",
      status: "in progress"
    };

    fetch("http://localhost:5000/createTask/1", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mock)
    }).then(res => {});
  };

  editGoal = () => {};

  editTask = () => {};

  render() {
    const BoardComponent = () => (
      <Board name="props" logout={this.handleLogOut} />
    );
    const EditGoalComponent = () => <EditGoal name="props" />;
    const EditTaskComponent = () => <EditTask name="props" />;
    const GoalListerComponent = () => (
      <GoalLister
        logout={this.handleLogOut}
        getGoals={this.getGoals}
        name="props"
      />
    );
    const LoginComponent = () => (
      <Login login={this.handleLogin} name="props" />
    );
    const TaskListerComponent = () => (
      <TaskLister
        logout={this.handleLogOut}
        getTasks={this.getTasks}
        name="props"
      />
    );
    const NotFound = () => <NoFound name="props" logout={this.handleLogOut} />;
    const HomeComponent = () => (
      <Activity logout={this.handleLogOut} name="props" />
    );
    const RegisterComponent = () => (
      <Register
        redirect={this.state.redirect}
        registerUser={this.registerUser}
      />
    );

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
