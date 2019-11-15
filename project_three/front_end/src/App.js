import React from "react";
import GifCard from './GifCard';
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    // fetch("http://localhost:3001/count")
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ count: data.count });
    //   });
  }

  fetchGif = (e) => {
    // To do: fix request bug
    const {search} = this.state;
    fetch("http://localhost:3001/gif_search", {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchTerm: search})
    })
      .then(res => res.json())
      .then(data => {
        this.setState({gifs: data.result})
        console.log(data)
      });
  };

  displayGifs = () => {
    const {gifs} = this.state;
    const gifContainer = [];

    gifs.forEach( gif => {
       gifContainer.push(<GifCard url = {gif.gifUrl} key={gif.key} />)
    })

    return(
      <div className="gif-container">{gifContainer}</div>
    )
    
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({search: e.target.value})
  }

  render() {
    const {gifs, search} = this.state;

    return (
      <div>
        <div className="header">
          <h2 className="title">Gif Search</h2>
        </div>

        <div className="input-container">
          <input id="gif-search-input" value={search} onChange={this.handleChange}/>
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
