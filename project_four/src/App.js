import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import '/pages/auth/signup.js';
import '/pages/auth/log_in.js';

import Axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: ''
    }
  }

  handleFirstName(e) {
    this.setState({firstName: e.target.value})
  }

  handleRegister() {
    const {firstName, lastName, email, userName, password} = this.state;
    Axios.post('https://localhost:5000/community/register',   {
      firstName, lastName, email, userName, password
    })
    
  }

  render(){

  return (
   <div>
     <Router>
      <nav id="Navigation">
       <div id="Nav_bar">
          <a id="Login_element" href="">Login</a> 
          <a href="Register_element">Register</a>
       </div>
     </nav>
     <header id= "Header_part">
       <h1 id = "title">Community Forum</h1>
     

     </header>
     </Router>

     <switch>
       <Route path = "/register"> <signup/> </Route>
       <Route path = "/login"> <log_in/> </Route>

       
     </switch>




   </div>
  );



} 



}

export default App;
