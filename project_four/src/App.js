import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import ProfilePage from './views/ProfilePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/profile" exact component={ProfilePage}/>
      </Switch>
    </div>
  );
}

export default App;
