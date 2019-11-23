
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
//import "./index.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgs: [],
      searchTerm: "",
      imgClick: ""
    };
  }

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleClick = e => {
    axios
      .post("/gif_search", {
        searchTerm: this.state.searchTerm
      })
      .then(res => {
        this.setState({ imgs: res.data.results });
      });
  };

  focusImage = text => {
    this.setState({ imgClick: text });
  };

  render() {
    const { imgs, searchTerm, imgClick } = this.state;

    if (imgClick) {
      return (
        <div>
          <img className="gif-focus-display" src={imgClick} />
        </div>
      );
    }

    return (
      <div className="medium">
      <div className="App">
        <div className="first">
        <h1 className="coloring">GIF Search</h1>
        <input
          type="text"
          id="gif-search-input"
          value={searchTerm}
          onChange={this.handleChange}
        />
      
    
        <button id="gif-search-submit" onClick={this.handleClick}>
          Search
        </button>
        </div>
        
        
      
        <div>
          {imgs.map((img, i) => (
            <div className="div">
            <img
              onClick={() => this.focusImage(img.gifUrl)}
              className="gif-result-display"
              key={i}
              src={img.gifUrl}
              alt="gif"
            />
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
