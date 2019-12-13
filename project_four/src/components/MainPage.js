import React from "react"
import './Header.css';
import {Link} from 'react-router-dom';

class MainPage extends React.Component{

    render() {
        return (
            <div className="main-container">

                <div className="split left">
                    <div className="centered">
                    <h4>Follow your interests.</h4>
                    <h4>Hear what people are talking about.</h4>
                    <h4>Join the conversation.</h4>

                    </div>
                    
                </div>

                <div className="split right">
                    <div className="centered">
                        <h1>See what’s happening in the world right now</h1>
                        <h4>Join Twitter today.</h4>
                        <nav>
                            <button className="button-singUp">
                                <Link to="/signup">Sign up</Link>
                            </button>
                            <br/>
                            <button className="button-logIn">
                            <Link to="/signin">Log in</Link>
                            </button>
                        </nav>

                    </div>
                    

                </div>
                
                

            </div>
        )
    }
}
export default MainPage; 
