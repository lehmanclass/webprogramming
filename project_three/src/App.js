import React from 'react';
import Axios from 'axios';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: '',
     
    };
  }

  handleClick = () => {
    const { searchTerm } = this.state;
    Axios.post(`http://localhost:3000/gif_search`, {
      searchTerm
    })
      .then(res => { this.setState({ results: res.data.results }) });

  }

  update = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  focus = (focusImg) => {
    
    this.setState({ focusImg });
   }

  render() {
    const { results, focusImg } = this.state;

    if (focusImg) {
      return (
        <img className="gif-focus-display"src={focusImg.gifUrl}alt="gif"/>
      )
    }

    return (
      <React.Fragment> 

        <h1> Gifs </h1>
        <div id="search">
          <input type="text" id="gif-search-input" onChange={this.update} ></input>

          <span>
            <button id="gif-search-submit" onClick={this.handleClick}>Search</button>
          </span>

        </div>


        <div>
          {results.map((result, i) => (<img className="gif-result-display" src={result.gifUrl} key={i} alt="gif" onClick={() => this.focus(result)} />))}
        </div>
      </React.Fragment>
    );
  }

}

export default App;