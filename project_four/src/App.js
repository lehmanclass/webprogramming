import React from 'react';
import './App.css';

import {Route} from 'react-router-dom';

import Header from './components/Header'

import CreateAccount from './components/CreateAccount'

import MainPage from './components/MainPage'


import TwitterPage from './components/TwitterPage'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      
    }
    
  }

  
 
  render() {
    return (
      <div >
        <Route path="/" exact component={MainPage}/>
        <Route path="/signup" component={CreateAccount}/>         
        <Route path="/signin" component={Header}/>
        <Route path="/twitterPage" component={TwitterPage}/>
      </div>
    );

  }
  
}

export default App;
