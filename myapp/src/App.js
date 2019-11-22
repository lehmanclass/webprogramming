import React from 'react';
import {Component} from 'react';
import './App.css';

class  App extends React.Component {

  constructor(props){
    super(props);
    this.state ={

      text: ''
    }
    this.handleChange =(e) =>{
      
    this.setState({ text: e.target.value

    })

    }
  }


  render(){
    console.log(this.state)

  return (

    <div className="App">
      
      
    <p> here is your react app</p>
    <input type="text" placeholder =" type your name" 
    onChange={this.handleChange}
    value ={this.state.text}>

    </input>
    </div>
  );
  }
}

export default App;
