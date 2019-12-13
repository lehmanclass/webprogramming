import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import './styles/App.css';
import Particles from 'react-particles-js';
import Pokemon from '../Pokemon';

const particleOpt = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {}
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    
  }


  handleOnClick(id) {
    console.log(id);
    fetch(`https://quiet-garden-37668.herokuapp.com/http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);

        this.setState({pokemon})
        console.log(pokemon);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <div className="App">
      <PokeList handleOnClick={this.handleOnClick} />
      <DetailView pokemon={this.state.pokemon} />
      
      </div>
      <Particles 
         params={particleOpt} />
         </div>
      
    );
  }
}


export default App;