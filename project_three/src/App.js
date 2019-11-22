import React from 'react';
import Axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        results : [] ,
        searchTerm : '' , 
        focusImg: false
      };
  }

  handleClick = () => {
    const { searchTerm } = this.state;
    Axios.post(`http://localhost:3000/gif_search`, {
        searchTerm
    })
    .then(res => {this.setState({results : res.data.results})});

  }
  

  updateThis = (event) => {
    if(event.keyCode === 13){
      this.setState({searchTerm : event.target.value})
      document.getElementById("gif-search-submit").click();
    } 
    this.setState({searchTerm : event.target.value})
  }

  focusThis = (focusImg) => {
    this.setState({focusImg});
  }

  render(){
    const { results, focusImg } = this.state;

    if (focusImg) {
      return (
        <img
          className="gif-focus-display"
          src={focusImg.gifUrl}
          alt = "gif"
        />
      )
    }

    return (
      <React.Fragment> 

        <h2> Look at my GIPHY MODEL : </h2>

        <div className="search">

          <input type = "text" id = "gif-search-input" onChange = {this.updateThis} onKeyDown = {this.updateThis} ></input>

          <span>
            <button id = "gif-search-submit" onClick = {this.handleClick}>Search</button>
          </span>
          
        </div>


        <div>
          {results.map((result,i) => (<img className="gif-result-display" src={result.gifUrl} key={i} alt = "gif" onClick={() => this.focusThis(result)} />))}
        </div>
      </React.Fragment>
    );
  }
  
}



export default App;