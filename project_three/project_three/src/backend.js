import axios from 'axios'
import React from 'react'
import './backend.css'

class Backend extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          giph1: []
        }
      }
    
      onClick = (event) => {
        event.preventDefault();
        let userInput = event.target[0].value;
        console.log(userInput);
    
        axios.get('http://api.giphy.com/v1/gifs/search?q='+userInput+'&api_key=JXDaYHMk25VwWeB2NhyLaPkdsp99JYCW&limit=5')
        .then((resolve) => {
          this.setState({giph1: resolve.data.data})
          
        })
        .catch((err) => console.log(err));
      }
      render(){
        let elems = [];
        for(let e of this.state.giph1) {
          elems.push(<img src={e.images.downsized.url} />);
        }
  
  
        return (
          <div className='main'> 
            <form onSubmit={this.onClick}>  
              <h1 id='search'>Search</h1>
              <input id='gif-search-input' type="text" />
            </form>
            <div className='gif-result-display'>
            {elems}
            </div>
            
          </div>
        );
  
    }
}

export default Backend;