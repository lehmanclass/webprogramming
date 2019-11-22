import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      imgs: [],
      searchTerm: '',
      imgClick: ''
    };
    
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  handleClick = (e) => {
    axios.post('/gif_search', {
      searchTerm: this.state.searchTerm
    }).then(res => {this.setState({imgs: res.data.results})
    });
  };

  focusImage = (text) => {
    this.setState({imgClick: text});
  }

  render() {
    const { imgs, searchTerm, imgClick } = this.state;

    if( imgClick){
      return (<div> 
              <img className="gif-focus-display" src={imgClick} /> 
          </div>)
    }

    return (
      <div style={{backgroundColor: "yellow"}} className="App">
        <h1 style={{color: "red"}}>GIF Search</h1>
        <h3 style={{backgroundColor: "orange"}} >Welcome to my GIF Searcher</h3>
        <input type="text" id="gif-search-input" value={searchTerm} onChange={this.handleChange}/>
        <button id="gif-search-submit" onClick={this.handleClick}>Search</button>
        <div style={{backgroundColor: "blue"}} >
          {imgs.map((img, i) => (
            <img onClick={()=> this.focusImage(img.gifUrl)} className="gif-result-display" key={i} src={img.gifUrl} alt="gif" />
          ))}
        </div>
      </div>
    )
  } 
}




export default App;
