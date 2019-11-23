import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {

  constructor(props) {
    super(props); 

    this.state = {
      searchTerm: "",
      img: [],
      focusedImg: null
    }
  }

  //   searchTerm = ( event ) => {
  //   event.preventDefault();
  //   let userInput = event.target[0].value;
  //   console.log(userInput);

    
  //   .then( (resolve) => {   // Called when data is returned
  //     this.setState( {img: resolve.data.data} );
  //     console.log(resolve.data.data);
  //   })
  //   .catch( (err)=> console.log(err));
  // }

  handleChange = (event) =>{
    this.setState(
      { searchTerm: event.target.value });

    console.log(this.state.searchTerm)
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;
    console.log(searchTerm);

    axios.post(`http://localhost:5000/gif_search`, {
      searchTerm
    })

    .then(res => {
      console.log(res.data.results);

      this.setState({img:res.data.results})
    }).catch((err)=> console.log(err))
  }


  displayImage = (focusedImg) => {
    this.setState({
      focusedImg
    });
  }


  render() {
    // let elemsimg = [];     
    // elemsimg = this.state.img.map(picture =>(<img alt = "thisisapic" src = {picture.images.downsized_large.url}></img>))
    
    const {img, searchTerm, focusedImg} = this.state;

    if (focusedImg) {
      return (
        <img
          className= "gif-focus-display"
          src={focusedImg.gifUrl}
          alt="gif"
        />
      );
    }

    return (


      <div className = "wholepage">
        <div className = "myheader"> 
       
            <form className="myform" onSubmit={this.handleSubmit}>
            <h2 className = "fonts">Searching for Gifs?</h2>
            
            <div className = "mysearchinput">
                  <input id= "gif-search-input" 
                         type="text" value={searchTerm} 
                         onChange={this.handleChange} />

                  <button id = "gif-search-submit">Show me!</button>
              </div>

            </form>
          </div>
                <div className= "gifdisplay">
                  {img.map((img, i) => (
                    <img
                      className= "gif-result-display"
                      src={img.gifUrl}
                      alt="gif"
                      key={i}
                      onClick={() => this.displayImage(img)}
                    />
                  ))}
              </div>

        </div>

            )
          }
        }


export default App;
