import React, { Component } from 'react';
import './App.css';
import Pixabay from './logo_square_pixabay.png';

class App extends Component {
  state = {
    chuckAPI: '',
    pokeAPIName: '',
    pokeAPIImg: '',
    swAPIName: '',
    swAPISpecies: '',
    swAPIHomeWorld: '',
    weatherAPICity: '',
    weatherAPIWeather: '',
    pixabayAPILink: '',
    cardsAPI: ''
  };

  componentDidMount() {

    // Chuck Norris API 
    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(json => this.setState({
        chuckAPI: json.value
      }))

    // PokeAPI 
    fetch('http://pokeapi.salestock.net/api/v2/pokemon/25')
      .then(response => response.json())
      .then(json => this.setState({
        pokeAPIName: json.name,
        pokeAPIImg: json.sprites.front_default
      }))
      
    // SWAPI
    fetch('https://swapi.co/api/people/13')
      .then(response => response.json())
      .then(json => this.setState({
        swAPIName: json.name
      }))
    fetch('https://swapi.co/api/species/3')
    .then(response => response.json())
    .then(json => this.setState({
      swAPISpecies: json.name
    }))
    fetch('https://swapi.co/api/planets/14')
    .then(response => response.json())
    .then(json => this.setState({
      swAPIHomeWorld: json.name
    }))

    // Weather API
    fetch('http://api.openweathermap.org/data/2.5/weather?q=phoenix,us&appid=58e914d0cca6e32900f55d445991e346')
    .then(response => {
      console.log(response)
     return response.json()
    }).then(json => {
      this.setState({
        weatherAPICity: json.name,
        weatherAPIWeather: json.weather[0].description
      })
    })

    // Pixabay
    fetch('https://pixabay.com/api/videos/?key=10494418-356403dc28f38679788247994&q=jellyfish')
      .then(response =>  response.json())
      .then(json => {
      this.setState({
        pixabayAPILink: json.hits[4].pageURL,
      })
    })

    // Deck of Cards API 
    // Need to shuffle cards with 
    // https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS,QS,JS,0S

    fetch('https://deckofcardsapi.com/api/deck/ab2r8jkx21el/draw/?count=5')
      .then(response =>  response.json())
      .then(json => {
        console.log('json cards', json.cards)
        for(let i =0; i < json.cards.length;i++){
          this.setState({
            cardsAPI: [...this.state.cardsAPI, {name: json.cards[i].value, [json.cards[i].value]: json.cards[i].image}],
          })
        }
    })
  }
  render() {
    const { chuckAPI, pokeAPIName, pokeAPIImg, swAPIName, swAPISpecies, swAPIHomeWorld, weatherAPICity, weatherAPIWeather, pixabayAPILink, cardsAPI } = this.state
    console.log('cardsAPI', cardsAPI)
    return (
      <div className="App">
          <h1>DevMountain Phoenix API Challenge</h1>
          <h2>Chuck Norris API</h2>
          <p>Joke: {chuckAPI}</p>
          <h2>PokeAPI</h2>
          <p>Name: {pokeAPIName}</p>
          <img src={pokeAPIImg || 'https://i.redd.it/fcys3yr59dax.gif'} alt="Sprite of Pikachu"/>
          <h2>SWAPI</h2>
          <p>Name: {swAPIName}</p>
          <p>Species: {swAPISpecies}</p>
          <p>Homeworld: {swAPIHomeWorld}</p>
          <h2>Weather API</h2>
          <p>City: {weatherAPICity}</p>
          <p>Weather: {weatherAPIWeather}</p>
          <h2>Pixabay</h2>
          <a href={pixabayAPILink} target="_blank"><img className="pixabay_picture" src={Pixabay} alt="Pixabay Icon"/></a>
          <h2>Deck of Cards API</h2>
          <h2>Royal Flush</h2>
          <div className="royalFlush">
            <img src={cardsAPI.length > 4 ? cardsAPI[cardsAPI.findIndex(e => e.name === "10")]["10"] : ''} alt="10"/>
            <img src={cardsAPI.length > 4 ? cardsAPI[cardsAPI.findIndex(e => e.name === "JACK")].JACK : ''} alt="Jack"/>
            <img src={cardsAPI.length > 4 ? cardsAPI[cardsAPI.findIndex(e => e.name === "QUEEN")].QUEEN : ''} alt="Queen"/>
            <img src={cardsAPI.length > 4 ? cardsAPI[cardsAPI.findIndex(e => e.name === "KING")].KING : ''} alt="King"/>
            <img src={cardsAPI.length > 4 ? cardsAPI[cardsAPI.findIndex(e => e.name === "ACE")].ACE : ''} alt="Ace"/>
          </div>
      </div>
    );
  }
}

export default App;


