import React from "react";
import GifCard from "./GifCard";
import ViewFullImage from "./ViewFullImage";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      imageUrl: ""
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
          this.setState({ gifs: data.results });
        });
    }
  };

  handleClick = url => {
    this.setState({ imageUrl: url });
  };

  displayGifs = () => {
    const { gifs } = this.state;
    const gifContainer = [];

    gifs.forEach(gif => {
      gifContainer.push(
        <GifCard
          handleClick={this.handleClick}
          url={gif.gifUrl}
          focusUrl={gif.focusUrl}
          key={gif.key}
        />
      );
    });

    return <div className="gif-container">{gifContainer}</div>;
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key == "Enter") {
      this.fetchGif();
    }
  };

  render() {
    const { gifs, search, imageUrl } = this.state;

    return (
      <div className="parent-container">
        {imageUrl ? (
          <ViewFullImage handleClick={this.handleClick} url={imageUrl} />
        ) : null}
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
