import React, { Component } from 'react'
import Navbar from "./components/navbar/Navbar";
// import axios from 'axios';
// import GifImage from './GifImage';
import GlobalStyle from './styles/Global';

class App extends Component {
  state = {
    navbarOpen: false
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }


      constructor(props){
    super(props);

    this.state = {
      coordinates: {
        Latitude: '',
        Longitude: '',
      }

    };

    this.handleClick = () => {
      console.log('you clicked');
      fetch('http://api.open-notify.org/iss-now.json').then(res => res.json()).then(json => {
      console.log(json);

      // const { iss_position: { latitude, longitude }} = json;

      const latitude = json.iss_position.latitude;
      const longitude = json.iss_position.longitude;

      // line 24 is the same thing that is happening on line 26 & 27 combined.

      this.setState({ coordinates: { Latitude: latitude, Longitude: longitude } } );
      });

    }

    

    }


  // searchZip = ( event ) => {
  //   event.preventDefault();
  //   let userInput = event.target[0].value;
  //   console.log(userInput);

  //  // axios.get('http://api.giphy.com/v1/gifs/search?q='+ userInput+'/JZAuoyug53rP4tcxWOFNZxkdb1826B00')
  //   axios.get('http://api.giphy.com/v1/gifs/search?q='+userInput+ '&api_key=JZAuoyug53rP4tcxWOFNZxkdb1826B00')
    
  //   .then( (resolve) => {   // Called when data is returned
  //     this.setState( {img: resolve.data.data} );
  //     console.log(resolve.data.data);
  //   })
  //   .catch( (err)=> console.log(err));
  // }

  render() {

    return (
      <React.Fragment>

      	<div>
	        <Navbar 
	          navbarState={this.state.navbarOpen} 
	          handleNavbar={this.handleNavbar}
	        />
        </div>


        <div>
        	<GlobalStyle />
        </div>

        <div>
        	<span>&nbsp;&nbsp;</span>
        </div>
        <div>
        	<span>&nbsp;&nbsp;</span>
        </div>
        <div>
        	<span>&nbsp;&nbsp;</span>
        </div>

        <div>

	        <h1>I am practicing React for Project 3</h1>

	       </div>


        <div>
          <span>&nbsp;&nbsp;</span>
        </div>
        <div>
          <span>&nbsp;&nbsp;</span>
        </div>
        <div>
          <span>&nbsp;&nbsp;</span>
        </div>




            <div>
              GIF DIRECTORY
            </div>
            <div>
              <input class="Input-bar" type="text"></input>
            </div>
            <div>
              {/*<button onClick={this.searchZip}>SEARCH</button>*/}
              <button onClick={this.handleClick}>SEARCH</button>
            </div>


        <div>
          <span>&nbsp;&nbsp;</span>
        </div>
        <div>
          <span>&nbsp;&nbsp;</span>
        </div>
        <div>
          <span>&nbsp;&nbsp;</span>
        </div>
        
            <div>
              <div>Latitude: {this.state.coordinates.Latitude} </div>
              <div>Longitude: {this.state.coordinates.Longitude} </div>
            </div>



      </React.Fragment>

    )
  }
}

export default App