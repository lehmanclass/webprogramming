import React, { Component } from 'react';
import Clarifai from 'clarifai';
import APIKEY from './myapikey';
import Navigation from './components/Navigation/Navigation';
import FoodRecognition from './components/FoodRecognition/FoodRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';




const app = new Clarifai.App({
  apiKey: APIKEY
});



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      foodInfo: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}


  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }





  calculateFoodProb = (data) => {
    const clarifaiFood = data.outputs[0].data.concepts;
    //const image = document.getElementById('inputimage');
    clarifaiFood.forEach(item => {
        this.setState({foodInfo: item.name});
        console.log(item.name, item.value + "%");
     })
  }



  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FOOD_MODEL,
      this.state.input)
    .then(response => {
      this.calculateFoodProb(response);

      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
            })
          
      }

    })
    .catch(err =>console.log(err));
      // there was an error
    
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
  const { isSignedIn, imageUrl, route, foodInfo } = this.state;
  return (
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home'
      ? <div>
          <Logo />
          <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries}
            />
          <ImageLinkForm  
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FoodRecognition imageUrl={imageUrl} foodInfo={foodInfo}/>
         </div>
      : (
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
    }
    </div>
   );
  }
}

export default App;
