import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gifImages: [],
      searchQuery: '',
      clickedImage: null
    };
    
  }

  onInputChange = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  onButtonClick = (event) => {
    axios.post('/gif_search', {
      searchQuery: this.state.searchQuery
    }).then(res => {this.setState({gifImages: res.data.results})
    });
  };

  focusImage = (clickedImage) => {
    this.setState({clickedImage});
  }

  render() {
    const { gifImages, searchQuery, clickedImage } = this.state;

    if( clickedImage){
      return (<div> 
              <img className="gif-focus-display" alt='' src={clickedImage.gifUrl} /> 
          </div>)
    }

    return (
      <div className="App">
        <h1 style={{color: "white"}}>GIF Search</h1>
        <h2 style={{color: "white"}} >Search a GIF</h2>
        <input type="text" id="gif-search-input" value={searchQuery} onChange={this.onInputChange}/>
        <button id="gif-search-submit" onClick={this.onButtonClick}>Search</button>
        <div>
          {gifImages.map((gif, key) => (
            <img className="gif-result-display" src={gif.gifUrl} alt="gif" key={key} onClick={()=>this.focusImage(gif)}/>
          ))}
        </div>
      </div>
    )
  } 
}




export default App;
