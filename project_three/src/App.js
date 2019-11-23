import React from 'react';
import logo from './logo.svg';
import './App.css';
import GifList from './GifList';
import request from 'superagent';
// import { url } from 'inspector';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // message:"",
      searchTerm: '',
      gifs: []
    };
    // this.handleTermChange = this.handleTermChange.bind(this)

    this.handleChange = (event)=>{
      this.setState({searchTerm: event.target.value});
    }

    this.handleClick=(term)=>{
      console.log(term);
      const searchTermBody = { searchTerm: this.state.searchTerm };
      const url = `http://localhost:3000/gif_search`
      fetch(url, {
        method: 'post',
        // body: JSON.stringify(event)
        // body: '{"searchTerm": this.state.searchTerm}'
        body: JSON.stringify(searchTermBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then((gifs) => {
        console.log(gifs);
        console.log(gifs.length);
        this.setState({
          gifs: gifs
        });
      });
  
      // this.setState({ gifs: response.body.data })
    }
  }
  render(){
    console.log(this.state);
    return (
      <div className="App">
        <p> Here Is Your Gif Search App</p>
        <input id="gif-search-input" type="text" placeholder ="Search For Gifs" onChange={this.handleChange} value ={this.state.text}/>
        <button id="gif-search-submit" onClick={this.handleClick}>Search</button>
        <GifList gifs={ this.state.gifs} />
      </div>
    );

  }
  
}

export default App;
