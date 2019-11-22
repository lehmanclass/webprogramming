import React from 'react';
import logo from './logo.svg';
import './App.css';
// import './project_three/index.js'

const DisplayText = (props) =>{
  return<div className="display-text">{props.message}</div>;
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // message:"",
      searchTerm: ''
    };

    this.handleChange = (event)=>{
      this.setState({searchTerm: event.target.value});
    }

    this.handleClick=(event)=>{
      const searchTermBody = { searchTerm: this.state.searchTerm };
      fetch('http://localhost:3000/gif_search', {
        method: 'post',
        // body: JSON.stringify(event)
        // body: '{"searchTerm": this.state.searchTerm}'
        body: JSON.stringify(searchTermBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      }).catch(function() {
        console.log("Booo");
      });
      // this.setState({message:''})
    }
  }
  render(){
    console.log(this.state);
    return (
      <div className="App">
      <p> Here Is Your Gif Search App</p>
      <input type="text" placeholder ="Search For Gifs" onChange={this.handleChange} value ={this.state.text}/>
      <button onClick={this.handleClick}>Search</button>
      </div>
    );

  }
  
}

export default App;
