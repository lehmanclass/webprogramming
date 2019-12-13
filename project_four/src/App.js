import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
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
    Axios.post('https://localhost:5000/event/register',  {

    })
    
  }

  render(){

  return (
   <div>
     <nav id="Navigation">
       <div id="Nav_bar">
          <a id="Login_element" href="">Login</a> 
          <a href="Register_element">Register</a>
       </div>
     </nav>
     <header id= "Header_part">
       <h1 id = "title">Community Forum</h1>
     

     </header>



     <form action = "http://localhost:3000/register" method= "POST">
       
       <header>REGISTER</header>
      
       <label for="first_Name">First Name:</label><input id="first_Name" type="text" name="firstName" onChange={this.handleFirstName} required/>
       <label for="last_Name" >LastName:</label><input id="last_Name" type ="text" name ="lastName" required/>
       <br></br>
       <label for="user_Name">Username:</label><input id="user_Name" type="text" name="userName" minLength="6" required/> 
       <label for="Password">Password:</label><input id="Password" type = "password" required minLength="7" maxLength= "16" />
       <br></br>
       <label for= "Email">Email Address:</label> <input id="Email" type="email" name="email_address" required />
       <br></br>
       <button id="register_button" onClick={this.handleRegister} >REGISTER</button>
      
       
     </form>

   </div>
  );



} 



}

export default App;
