import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
      
  }

  render(){

  return (
   <div>
     <header id= "Header_part">
       <h1 id = "title">Community Forum</h1>
     <nav id="Navigation">
       <div id="Nav_bar">
          <a href=""></a>
       </div>
     </nav>

     </header>



     <form action = "http://localhost:3000/register" method= "POST">
       
      
       <span>First Name:</span><input id= "first_Name" type="text" name="firstName" required/><span>LastName:</span> <input id="last_Name" type ="text" name ="lastName" required/>
       <br></br>
       <span>Username:</span><input id= "user_Name" type="text" name="userName" minlength="6" required/> <span>Password:</span><input id= "Password" type = "password" required minlength="7" maxlength= "16" />
       <br></br>
       <button id="register_button">REGISTER</button>
      
       
     </form>

   </div>
  );



} 



}

export default App;
