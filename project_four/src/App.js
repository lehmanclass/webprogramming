import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import  Register from './components/Register';
import Images from './components/Images';
import BuyNow from './components/BuyNow';
//import { Route, IndexRoute } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";


function App() {
  return (
    
    <div className="App">
       {/* <Login />
      <Register /> 
      <Images />
      <BuyNow /> */}


      <h2><b>Dollar 7</b> </h2>

<Router>





    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/Images" component={Images} />
    <Route path="/Pay" component={BuyNow} />
</Router>
     
  
</div>
   

  
    );
  
}

export default App;

