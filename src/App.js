import React, {Component} from 'react';
import api from './apis/home';
import Wrapper from './components/Wrapper';
import './App.css';

class App extends Component {
  state = {
    planets: [],
    vehicles: [],
    token: ''
  }
  
  componentDidMount() {
    this.getPlanets();
    this.getVehicles();  
  }

  getPlanets () {
    api.getPlanet().then((response) => {
      this.setState({
        planets: response,
      })
    })
  }

  getVehicles () {
    api.getVehicles().then((response) => {
      this.setState({
        vehicles: response,
      })
    })
  }

  getToken () {
    let token = api && api.getToken().then((response) => {
      return response
    });
    return token
  }

  findFalcone = (token, selectedPlanetArray, selectedVehicleArray) => {
    let result = api && api.findFalcone(token, selectedPlanetArray, selectedVehicleArray).then((response) => {
      return response
    });
    return result
  }  

  render() {  
    const { planets, vehicles } = this.state;  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Finding Falcone!</h1>
          <h3>Select planets you want to search in:</h3>
          <div className={`wrapper`}>
            {!!(planets.length && vehicles.length) && <Wrapper planetData={planets} vehicleData={vehicles} getToken={this.getToken} findFalcone={this.findFalcone}/>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
