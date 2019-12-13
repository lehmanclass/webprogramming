import React from 'react';
import './Header.css';
import {Link, Redirect} from 'react-router-dom';

class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password:""

        };
    }

    handleChange = (event) => {

        this.setState({ 
            [event.target.name]: event.target.value
        });

    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { email , password } = this.state;

        fetch('/tweet/login', { 
            method:'post',
            body: JSON.stringify({
                email,
                password

            }),
            headers: {
                'Content-Type': 'application/json'
            }
            

        }).then(data => data.json())
        .then((data) => {
            localStorage.setItem('id', data.userId);
            this.forceUpdate();
        });

    }






    render() {
        const {email, password } = this.state;

        if (localStorage.getItem('id')) {
            return <Redirect to="/twitterPage"/>
        }
        return(
            <div className="main-body">
    
                <header className="image-bird">Image</header>
                <span className="title-form">Log in to Twitter</span>
    
                <form className="main-form" onSubmit={this.handleSubmit}>

                    <input 
                    id="user-email-input" 
                    type="text"
                     name="email" 
                     placeholder="Username"
                     value={email}
                     onChange={this.handleChange}
                      ></input>
                    <br/>
                    <input 
                    id="user-password-input"
                     type="password" 
                     name="password" 
                     placeholder="Password"
                     value={password}
                     onChange={this.handleChange}

                     ></input>
                    <br/>
                    <button className="button-login">
                    Log in
                    </button>
    
                </form>
    
                <div>
                   <span><a href="#">Forgot passwrod?  </a></span>
                    <span> . </span>
                   <span> <a href="#"> Sign up for Twitter</a></span>
                </div>
            </div>
        )

    }
    
}
export default Header;
