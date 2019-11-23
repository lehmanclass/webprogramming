import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {

  constructor(props) {
    super(props); 

    this.state = {
      searchTerm: "",
      gif_img: [],
     focus_img: null
    }
  }


  handleChange = (event) =>{
    this.setState({ searchTerm: event.target.value });
     console.log(this.state.searchTerm)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    console.log(searchTerm);
    axios.post(`http://localhost:3000/gif_search`, {
      searchTerm
    })

    .then(res => {
      console.log(res.data.results);
      this.setState({gif_img:res.data.results})
    }).catch((err)=> console.log(err))
  }


 img_dis = (focus_img) => {
    this.setState({
      focus_img
    });
    console.log(focus_img);
  }


  render() {
    
    const {gif_img, searchTerm, focus_img} = this.state;

    if (focus_img) {
      return (
        <img
          className= "gif-focus-display" src={focus_img.gifUrl} alt="giphy"/>
      );
    }

    return (

      <div className = "thebody">
        <div className = "SearchBar">
            <form className="myform" onSubmit={this.handleSubmit}>
            <h1>GIPHY SEARCH APP</h1>
              <input id= "gif-search-input" type="text" value={searchTerm} onChange={this.handleChange} />
              <button id="gif-search-submit">Search</button>
            </form>
        </div>
          {gif_img.map((gif_img, i) => (
            <img className= "gif-result-display" src={gif_img.gifUrl} alt="giphyimg"
              key={i} onClick={() => this.img_dis(gif_img)}/>
          ))}
        </div>

    )
  }
}


export default App;