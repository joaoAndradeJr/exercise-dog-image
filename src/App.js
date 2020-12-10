import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.fetchDog = this.fetchDog.bind(this);
    
    this.renderDogElement = this.renderDogElement.bind(this);
    this.savePicture = this.savePicture.bind(this);

    this.state = {
      dog: undefined,
      storedDogs: [],
      loading: true
    };
  }

  async fetchDog() {
    this.setState({loading: true})
    const requestDog = await fetch('https://dog.ceo/api/breeds/image/random');
    const returnedObject = await requestDog.json();
    this.setState({
      dog: returnedObject.message,
      loading: false
    });
  }

  componentDidMount() {
    this.fetchDog();
  }

  savePicture() {
    this.setState(({ storedDogs, dog }) =>({
      storedDogs: [...storedDogs, dog]
    }));
    this.fetchDog();
  }

  renderDogElement() {
    return (
      <div>
        <img className="showPicture" src={this.state.dog} alt="dog" />
        <button type="button" onClick={this.savePicture}>Salvar foto</button>
      </div>
    )  
  }
  
  render() {
    const loading = <span className="showLoading">Loading...</span>;
    const { storedDogs } = this.state;

    return (
      <div>
        <span>
          {storedDogs.map((picture) => (<img src={picture} alt="dog" />))}
        </span>
        <p>{this.state.loading ? loading : this.renderDogElement()}</p>
      </div>
    );
  }
}

export default App;
