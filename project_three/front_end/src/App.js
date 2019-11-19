import React from "react";
import GifCard from "./GifCard";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  fetchGif = () => {
    const { search } = this.state;
    if (search.trim().length > 0) {
      fetch("/gif_search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ searchTerm: search })
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ gifs: data.result });
        });
    }
  };

  displayGifs = () => {
    const { gifs } = this.state;
    const gifContainer = [];

    gifs.forEach(gif => {
      gifContainer.push(<GifCard url={gif.gifUrl} key={gif.key} />);
    });

    return <div className="gif-container">{gifContainer}</div>;
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ search: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key == "Enter") {
      this.fetchGif();
    }
  };

  render() {
    const { gifs, search } = this.state;

    return (
      <div>
        <div className="header">
          <h2 className="title">Gif Search</h2>
        </div>

        <div className="input-container">
          <input
            id="gif-search-input"
            value={search}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button id="gif-search-submit" onClick={this.fetchGif}>
            Search
          </button>
        </div>

        {gifs ? this.displayGifs() : null}
      </div>
    );
  }
}

export default App;
