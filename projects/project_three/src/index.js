import React from 'react';
import ReactDOM from 'react-dom';
import GifList from './components/GifList';
import SearchBar from './components/SearchBar';
import request from 'superagent';
import './styles/app.css';
import GifModal from './components/GifModal';
import { secret_key } from './mykey';

class App extends React.Component {
    constructor() { 
        super();

        this.state = {
            gifs: [],
            selectedGif: null,
            modalIsOpen: false
        };
    }

    openModal(gif) {
        this.setState({
            modalIsOpen: true,
            selectedGif: gif
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            selectedGif: null
        });
    }

    handleTermChange(term) {
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=${secret_key}&limit=5`;

        request.get(url, (err, res) => {
            this.setState({ gifs: res.body.data })
        });
    }

    handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    console.log(searchTerm);
    axios.post(`http://localhost:3000/gif_search`, {
      searchTerm
    }).then(res => {
      console.log(res.data.results);
      this.setState({gif_img:res.data.results})
    }).catch((err)=> console.log(err))
  }

    render() {
        return (
            <div>
                <SearchBar onTermChange={term => this.handleTermChange(term)}/>
                <button id="gif-search-submit" onClick={this.handleSubmit}>Search</button>
                <GifList gifs={this.state.gifs}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));