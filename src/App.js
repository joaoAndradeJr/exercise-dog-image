import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      image: ''
    };
  }

  async fetchDog() {
    const requestDog = await fetch('https://dog.ceo/api/breeds/image/random');
    const returnedObject = await requestDog.json();
    this.setState({
      image: returnedObject.message
    });
  }

  componentDidMount() {
    this.fetchDog();
  }
  
  render() {
    const loading = <span className="showLoading">Loading...</span>;
    const image = <img className="showPicture" src={this.state.image} alt='dog'/>;

    return (
      <div>
        <p>{this.state.image === '' ? loading : image}</p>
      </div>
    );
  }
}

export default App;
