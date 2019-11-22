import React from 'react';
import axios from 'axios';
import './App.css';
import Backend from './backend'

class App extends React.Component {

  render()
    {
      return (
      <div>
        <Backend />
      </div>
      );

   }
}

export default App;
