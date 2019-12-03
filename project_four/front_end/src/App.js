import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Board from './components/Board';
import EditGoal from './components/EditGoal';
import EditTask from './components/EditTask';
import GoalCard from './components/GoalCard';
import Login from './components/Login';
import LogOut from './components/LogOut';
import TaskCard from './components/TaskCard';
import Nav from './components/Nav';

class App extends React.Component{
  render(){
    return (
      <div>
        <Nav />
      </div>
    )
  }
}

export default App;
