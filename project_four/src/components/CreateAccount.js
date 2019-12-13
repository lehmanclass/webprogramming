import React from 'react';
import './Header.css';
import { Redirect } from 'react-router-dom';

class CreateAccount extends React.Component {
    constructor(){
        super()
        this.state = {
            username:"",
            email:"",
            password:"",
            success: false
        };
        
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ 
            [name]: value
        });

    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {username, email, password} = this.state;

       fetch('/tweet/createUser', {
           method: 'post',
           body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
       })
        .then((data) => {
            this.setState({success: true});
        });

    }







    render() {
        const {username, email, password, success } = this.state;

        if (success) {
            return <Redirect to="/signin"/>
        }
        return(
            <React.Fragment>

                 <div className="main-body">
    
                <header className="image-bird">Image</header>

                <span className="title-form">Join Twitter Today</span>

                <form className="main-form" onSubmit={this.handleSubmit}>

                    <input 
                    id="user-name-input" 
                    type="text"
                    name="username" 
                    value={username} 
                    onChange={this.handleChange}></input>
                    <br/>

                    <input 
                    id="user-email-input" 
                    type="text" 
                    name="email"
                    value={email} 
                    onChange={this.handleChange}

                    ></input>
                    <br/>
                
                    <input 
                    id="user-password-input" 
                    type="password" 
                    name="password"
                    maxLength="10" 
                    value={password } 
                    onChange={this.handleChange} ></input>
                    <br/>

                    <button className="button-login">Sign up</button>

                </form>

                <div>
                    <span>
                            By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                    </span>
                </div>
                
            </div>

            </React.Fragment>
           
        )

    }
    
}
export default CreateAccount;
