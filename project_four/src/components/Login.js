import React from 'react';

import './style.css';

import {browserHistory} from 'react-router';

import {Link} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
             username: '', 
             password: '',
             isLogin: false
             
        }
        
       
      }

    onNavigate=(e)=>{
       e.preventDefault();
      // location.reload();
      
    fetch('http://localhost:5000/login', {
     method: 'POST',
    
     body: {
         "username":this.state.username,
         "password":this.state.password,
         "email":this.state.email
     }
    

     
    
    })//.then(response => response.json()).then( browserHistory.push("/Images"));
    //serverResponse => console.warn(serverResponse))
  
        // browserHistory.push("/Images");
     
        .then(response => response.json())//.then( result=>result.browserHistory.push("/Images"));
        browserHistory.push("/Images");
     };

    
    
    //  componentDidMount() {
    //     AsyncStorage.getItem('loggedInStatus',
    //     (value) => {
    //       this.setState({ loggedInStatus: value });
    //     });
    //   }
    
   
    render(){
        return(

           
        <div className="base-contanier">
            <div className="header">login</div>
            <div className="content">
            
                <div className="form">
                <div className="form-group">
                    <label htmlFor="username" >Username</label>
                    <input type ="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} name="username" placeholder="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type ="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} name="password" placeholder="password" />
                   
                </div>

            </div>
            </div>
    
            <div className="footer">
        <button type="button"  onClick={this.onNavigate} className="btn">Log In</button>
        
         
     </div>
     <div className="registration">
     <Link to={"/Register"}> Register for an account</Link> 

     </div>
        </div>
        );
    }



}
    
    
   

export default Login;


// let { redirectMe } = this.state;
//     if(redirectMe){

   