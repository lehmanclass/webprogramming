import React from 'react';
import Axios from 'axios';


class signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            username : "",
            password : ""
        }
    }

    handleFirstName(e) {
        this.setState({firstName: e.target.value});
      }

    handleLastName(e){
        this.setState({lastName : e.target.value});
    }

    handleEmail(e){
        this.setState({email : e.target.value});
    }

    handleUsername(e){
        this.setState({username : e.target.value});
    }

    handlePassword(e){
        this.setState({password : e.target.value});
    }

    
    handleRegister() {
        const {firstName, lastName, email, userName, password} = this.state;
        Axios.post('https://localhost:5000/community/register',   {
          firstName, lastName, email, userName, password
        });
        return "Your account has been created. You can now login."
        
      }

      render(){
          return(
            <form onSubmit= {this.handleRegister}>
       
            <header>REGISTER</header>
           
            <label for="first_Name">First Name:</label><input id="first_Name" type="text" name="firstName" onChange={this.handleFirstName} required/>
            <label for="last_Name" >LastName:</label><input id="last_Name" type ="text" name ="lastName" required/>
            <br></br>
            <label for="user_Name">Username:</label><input id="user_Name" type="text" name="userName" minLength="6" required/> 
            <label for="Password">Password:</label><input id="Password" type = "password" required minLength="7" maxLength= "16" />
            <br></br>
            <label for= "Email">Email Address:</label> <input id="Email" type="email" name="email_address" required />
            <br></br>
            <button id="register_button">REGISTER</button>
           
            
          </form>
          );
      }
}

export default signup;