import React, {Component} from 'react';
import apis from './apis/home';
import Planets from './components/Planets';
import Vehicles from './components/Vehicles';
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
    apis.getPlanet().then((response) => {
      this.setState({
        planets: response,
      })
    })
  }

  getVehicles () {
    apis.getVehicles().then((response) => {
      this.setState({
        vehicles: response,
      })
    })
  }

  render() {  
    const { planets, vehicles } = this.state;  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Finding Falcone!</h1>
          <h3>Select planets you want to search in:</h3>
          <div className={`wrapper`}>
            {!!(planets.length && vehicles.length) && <Wrapper planetData={planets} vehicleData={vehicles}/>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
