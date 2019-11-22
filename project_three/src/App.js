import React from 'react';
import './App.css';
import axios from 'axios';
//import DisplayImages from './DisplayImages'

import Header from "./Header"


class App extends React.Component {
  constructor(props){
    super(props) 
    this.state = {
      searchTerm:"",
      gifs:[],
      imageFocus: null
      
    };
  }
  
  componentDidMount() {
  //  this.handleClick()
  }

  handleChange = (event) =>{
    this.setState({ searchTerm: event.target.value });
    console.log(this.state.searchTerm)

  }
  DisplayImages=(imageFocus) => {
    this.setState({ imageFocus });



  }

 
  handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    console.log(searchTerm);
    axios.post(`http://localhost:3000/gif_search`, {
      searchTerm
    })
    .then(resp => {
      console.log(resp.data.results);
      this.setState({gifs:resp.data.results, searchTerm: ''}) //   searchTerm: '' after submit input, it will resh the page an replace the empty 
    }).catch((err)=> console.log(err))
  }
 

  render() {
    
    const {gifs, searchTerm , imageFocus} = this.state;

    if(imageFocus){
      return(
        <img className="gif-focus-display" src={imageFocus.gifUrl} alt="imgfocus"/>
      );

    }


  
    return (

      <React.Fragment>

        <div className="main-bode">

          <div className="App">


            <Header/>

            <form className="my-form" onSubmit={this.handleSubmit}>

              <input id="gif-search-input" type="text" name="userIput"  value={searchTerm} onChange={this.handleChange} />
              

              <button>Search</button>

            </form>
            
          </div>
          
        
          {gifs.map((gif, i) => (

            <img className="gif-result-display" src={gif.gifUrl} alt="gif" key={i} onClick={()=> this.DisplayImages(gif)} />
          ))}
          
        </div>

      </React.Fragment>
    )



  }
}
export default App;
