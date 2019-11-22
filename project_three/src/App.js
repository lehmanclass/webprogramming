import React from "react";
import GifBox from "./GifBox";
import ImageView from "./ImageView ";
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

      console.log(search)
      fetch(`/gif_search`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
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

  clickHandler = url => {

    this.setState({ imageUrl: url });
  };

  GifsDisplay= () => {

    const { gifs } = this.state;
    const gifContainer = [];

    gifs.forEach(gif => {
      gifContainer.push(
        <GifBox
        theClick={this.clickHandler}
          url={gif.gifUrl}
          focusUrl={gif.focusUrl}
          key={gif.key}
        />
      );
    });

    return <div className="gif-container">{gifContainer}</div>;
  };

  ChangeHandler = e => {

    this.setState({ search: e.target.value });
  };

  KeyPressHandler = e => {
    if (e.key ===  "Enter") {
      this.fetchGif();
    }
  };

  render() {
    const { gifs, search, imageUrl } = this.state;

    return (
      <div className="parent-container">
        { imageUrl ? (
          <ImageView  TheClick={this.handleClick} url={imageUrl} />
        ) : null }

        <div className="first_header">
          <h1 className="title">Gif-Search</h1>
        </div>

        <div className="input-container">
          <input
            id="gif-search-input"
            value={search}
            onChange={this.ChangeHandler}
            onKeyPress={this.KeyPressHandler}
          />
          <button id="gif-search-submit" onClick={this.fetchGif}>
            Search
          </button>
        </div>

        {gifs ? this.GifsDisplay() : null}
      </div>
    );
  }
}

export default App;