import React from 'react';
import './App.css';
import GifList from './GifList';
// import request from 'superagent'; //npm install superagent 
import GifModal from './GifModal'; //npm install --save react-modal 



class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // message:"",
      searchTerm: '',
      gifs: [],
      selectedGif: null,
      modalIsOpen: false
    };

    this.handleChange = (event)=>{
      this.setState({searchTerm: event.target.value});
    }

    this.handleClick=(term)=>{
      console.log(term);
      const searchTermBody = { searchTerm: this.state.searchTerm };
      const url = `http://localhost:3000/gif_search`
      fetch(url, {
        method: 'post',
        // body: JSON.stringify(event)
        // body: '{"searchTerm": this.state.searchTerm}'
        body: JSON.stringify(searchTermBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then((gifs) => {
        console.log(gifs);
        console.log(gifs.length);
        this.setState({
          gifs: gifs
        });
      });
    }
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

  render(){
    // console.log('App.js has this.state.gifs of ->', this.state.gifs);
    return (
      <div className="App">
        <h1>Gif Search</h1>
        <input id="gif-search-input" type="text" placeholder ="Search For Gifs" onChange={this.handleChange} value ={this.state.text}/>
        <button id="gif-search-submit" onClick={this.handleClick}>Search</button>
        <GifList  gifs={this.state.gifs}
                  onGifSelect={selectedGif => this.openModal(selectedGif) } />
        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );

  }
  
}

export default App;
