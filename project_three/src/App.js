import React from 'react'; // const React = require('react')
import { promised } from 'q';

class App extends React.Component{ 

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      image: [] 
    };

    this.displayimages =  () => {
      const imgsContainer =[];
    if(this.state.image.length > 0){
      this.state.image.forEach(img => imgsContainer.push(
        <img src={img.gifUrl} alt="" />
      ))
      return imgsContainer;

    }
    return "No images for now"
    }

  

    this.changeText = (event) => {
      const search = event.target.value;
      this.setState({search});
    };

    this.handleCLICK = (event) => {
      event.preventDefault();
      console.log('you clicked');

      fetch("http://localhost:3000/gif_search",{
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          search : this.state.search
        })
      })
      .then(response => response.json())
      .then(responsedata => {
        console.log(responsedata);
        this.setState({
          image : responsedata.results
         })
      })
    }
    
  }
  


  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <h5>Giphy Search</h5>
        <form name="search bar">
        <input type="text" placeholder='Search key' onChange={this.changeText}></input>
        <button id="gif-search-input" onClick={this.handleCLICK}>Search</button>
        </form>
        <div>
          <h2>Results</h2>
          <ul id=".gif-result-display">
            {this.displayimages()}
          </ul>
        </div>
        <div>
        </div>
        </React.Fragment>
    );
  }
}    
  

export default App;