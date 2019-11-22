import React from 'react';
import Axios from 'axios';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      focus: false
    };
  }

  handleClick = () => {
    const { searchTerm } = this.state;
    Axios.post(`http://localhost:3000/find`, {
      searchTerm
    })
      .then(res => { this.setState({ results: res.data.results }) });

  }

  inputTyped = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  BigFocus = (focusImg) => {
    this.setState({ focusImg }); 
  }

  render() {
    const { results, focus } = this.state;

    if (focus) {
      return (
        <img
          className="gif-focus-display"
          src={focus.gifUrl}
          alt="gif"
        />
      )
    }

    return (
      <React.Fragment> 
        <div id="SearchPlace">
          <h1> Welcome to GIF Search! </h1>
          <input placeholder= "Type something" type="text" id="gif-search-input" onChange={this.inputTyped} ></input>
            <button id="gif-search-submit" onClick={this.handleClick}>Search</button>
         
        </div>

        <div>
          {results.map((result, i) => 
          (<img className="gif-result-display" 
          src={result.gifUrl} 
          key={i} alt="gif" 
          onClick={() => this.BigFocus(result)} />))}
        </div>
      </React.Fragment>
    );
  }

}



export default App; 