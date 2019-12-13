import React from 'react'; // const React = require('react')
import { promised } from 'q';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      request: '',
      parameter: '1',
      results: []
    };

    this.changeText = (event) => {
      const name = event.target.value;
      this.setState({ name });
    };

    this.handleCLICK = (event) => {
      event.preventDefault();

      fetch("http://localhost:3000/anime_search", {
        method: "get",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name
        })
      })
        .then(response => response.json())
        .then(responsedata => {
          console.log(responsedata);
        })
    }

  }


  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <h1>Anime</h1>
        <form name="search bar">
          <input type="text" placeholder='Name?' onChange={this.changeText}></input>
          <button id="Anime-search-input" onClick={this.handleCLICK}>Search</button>
        </form>
        <div>
          <div id="Anime-Results">
            {/* <image> {this.state.images[0]} </image>
            <image> {this.state.images[1]} </image> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default App;