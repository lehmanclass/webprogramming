import React from 'react';
import Axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        results : [] ,
        searchTerm : ''
      };
  }

  handleClick = () => {
    const { searchTerm } = this.state;
    Axios.post(`http://localhost:3000/gif_search`, {
        searchTerm
    })
    .then(res => {this.setState({results : res.data.results})});

  }
  

  updateThis = (event) => {
    this.setState({searchTerm : event.target.value})
  }

  render(){
    const { results } = this.state;

    return (
      <React.Fragment> 

        <h2> Find My Gif </h2>

        <div className="search">

          <input type = "text" id = "gif-search-input" onChange = {this.updateThis} ></input>

          <span>
            <button id = "gif-search-submit" onClick = {this.handleClick}>Search</button>
          </span>
          
        </div>


        <div>
          {results.map((result,i) => (<img className="gif-result-display" src={result.gifUrl} key={i} alt = "gif"/>))}
        </div>
      </React.Fragment>
    );
  }
  
}



export default App;