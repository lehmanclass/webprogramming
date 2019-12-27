import React from 'react';
import './App.css';
import axios from 'axios';
import GifImage from './GifImage';

class App extends React.Component {

  constructor(props) {
    super(props); 

    this.state = {
      img: []
    }
  }

    searchZip = ( event ) => {
    event.preventDefault();
    let userInput = event.target[0].value;
    console.log(userInput);

   // axios.get('http://api.giphy.com/v1/gifs/search?q='+ userInput+'/JZAuoyug53rP4tcxWOFNZxkdb1826B00')
    axios.get('http://api.giphy.com/v1/gifs/search?q='+userInput+ '&api_key=JZAuoyug53rP4tcxWOFNZxkdb1826B00')
    
    .then( (resolve) => {   // Called when data is returned
      this.setState( {img: resolve.data.data} );
      console.log(resolve.data.data);
    })
    .catch( (err)=> console.log(err));
  }

  render() {
    let elemsimg = [];     // container
    // for(let zip of this.state.zipcodes) {
    //   elems.push(<ZipResult key={index++} {...zip}/>);
    // }
    // elems = this.state.img.map((elem, i) => <ZipResult key={i} {...elem} />)


    // elems = this.state.img.map((elem, i) => <GifImage key={i} {...elem} />);
    elemsimg = this.state.img.map(picture =>(<img src = {picture.images.downsized_large.url}></img>))
    
    
    return (

    <div className = "wholepage">
      <div className = "myheader"> 
        
          <form onSubmit={this.searchZip}>  
              <h1>Search gifs</h1>
              <input id = "myform" type="text" />
          </form>
        </div>

        {elemsimg}
      
    </div>
    );
  }
}

export default App;