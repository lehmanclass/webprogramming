import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
