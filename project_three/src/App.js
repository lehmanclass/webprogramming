import React from 'react';
import Axios from 'axios';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: '',
      focusImg: false
    };
  }

  handleClick = () => {
    const { searchTerm } = this.state;
    Axios.post(`http://localhost:3000/gif_search`, {
      searchTerm
    })
      .then(res => { this.setState({ results: res.data.results }) });

  }

  updateThis = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  focusThis = (focusImg) => {
    // document.getElementsByClassName('gif-focus-display').focus();
    this.setState({ focusImg }); //Concaatenate each gif imagine as an index and place into the array list results. Should be able to iterate through.
  }

  render() {
    const { results, focusImg } = this.state;

    if (focusImg) {
      return (
        <img
          className="gif-focus-display"
          src={focusImg.gifUrl}
          alt="gif"
        />
      )
    }

    return (
      <React.Fragment> {/*Better than a div*/}
        <div id="search">
          <input type="text" id="gif-search-input" onChange={this.updateThis} ></input>

          <span>
            <button id="gif-search-submit" onClick={this.handleClick}>Search</button>
          </span>

        </div>

        <h1> Search the GiF of your choice :D </h1>

        <div>
          {results.map((result, i) => (<img className="gif-result-display" src={result.gifUrl} key={i} alt="gif" onClick={() => this.focusThis(result)} />))}
        </div>
      </React.Fragment>
    );
  }

}



export default App;