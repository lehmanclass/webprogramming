import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
// import './index.css';
import App from './App';
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom';





const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/index">Index</Link>
        </li>



      </ul>
      <Switch>
        <Route path="/" component={App} />
        <Route path="/index" component={App2} />

  
      </Switch>
    </div>
  </Router>
)



ReactDOM.render(routing, document.getElementById('root'));