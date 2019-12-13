import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Auth from './Auth';
import Login from './Login';
import Register from './Register';

export default () => (
    <Router>
        <Switch>
        <route exact path="/login" render={props => <Login {...props}/>}/>
        <route  exact path="/register" render={props => <Register {...props}/>}/>
        <route  exact path="/auth" render={props => <Auth {...props}/>}/>
        </Switch>
    </Router>
);