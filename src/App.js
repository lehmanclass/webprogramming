import React from 'react';
import Axios from 'axios';
import './styles.css';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        results : [],
        searchTerm : '',
        focusImg: false
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

  focusThis = (focusImg) => {
   
    this.setState({focusImg}); 
  }

  render(){
    const { results, focusImg } = this.state;

    if (focusImg) {
      return (
        <img
          className="gif-focus-display"
          src={focusImg.gifUrl}
          alt = "gif"
        />
      )
    }

    return (
      <React.Fragment> 
        <div id="search">
        <input type = "text" id = "gif-search-input"  onChange = {this.updateThis} ></input>

        <span>
        <button id = "gif-search-submit" onClick = {this.handleClick}>Search</button>
        </span>

        </div>

        <h1> It's Pronounced "Gif" not "Gif" </h1>
        <h2>Griff Requires The Gif</h2>
        <div>
        {results.map((result,i) => (<img className="gif-result-display" src={result.gifUrl} key={i} alt = "gif"/>))}
        </div>
      </React.Fragment>
    );
  }
  
}



export default App; 

