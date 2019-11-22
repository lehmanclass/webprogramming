import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  
  constructor(props){
    super(props);
    this.state={

     searchTerm:[],

     giphyImg:[],

     clickedImage: null
    }
  
  }


  onClick = (event) => {

    event.preventDefault();

    let searchTerm = this.state.searchTerm; 

    axios.post('http://localhost:3000/gif_search', {
      searchTerm
    }).then((res) => {


      this.setState({ giphyImg: res.data.results});
      //console.log(res.data.results);

     


      

     

    

    

    })
  }

  onChange = (event) =>{
    event.preventDefault();

    this.setState({searchTerm: event.target.value});
    console.log(event.target.value);

  }

  focus = (clickedImage) => {
    this.setState({clickedImage})
  }
  
  render(){
    
    const { searchTerm, giphyImg, clickedImage } = this.state;

    if (clickedImage) {
      return (
        <img className='gif-focus-display' src={clickedImage.gifUrl} alt='giphy image' />
      )
      }
    
    
  return (
    <div className="App">
    
    <h1>Giphy</h1> 
    

  
    

    <form className ="gif-search-submit" onSubmit ={this.onClick} >
      <h5>Search for your favorite giphy</h5>
      <input id="gif-search-input" value = {searchTerm} onChange = {this.onChange} type="text"/>
      <button > Search</button>
    

    </form>

    {giphyImg.map((gif, key) => (
      
      <img className='gif-result-display' src={gif.gifUrl} alt='giphy image' key={key} onClick={() => this.focus(gif)}/>
    ))}

    


    
   
    </div>
  );
  }
}

export default App;
