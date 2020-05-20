import React, {Component} from 'react';
import api from './apis/home';
import Planet from './components/Planets';
import * as utils from './utils/utils'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = utils.getStateFromPropsForDesktop(props);
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

  reset () {
    //utils.resetState.call(this)
  }

  render() {  
    const { planets, vehicles } = this.state;  
    return (
      <div className="App">
        <header className={`header-section`}>
          <a href={'#'} onClick={this.reset.bind(this)}>Reset</a> | 
          <a href={"https://www.geektrust.in/"} target="_blank">GeekTrust Home</a>
        </header>
        <main className="main-section">
          <h1>Finding Falcone!</h1>
          <h3>Select planets you want to search in:</h3>
          <div className={`wrapper`}>
            {!!(planets.length && vehicles.length) && <Planet planetData={planets} vehicleData={vehicles} getToken={this.getToken} findFalcone={this.findFalcone} />}
          </div>
        </main>
        <footer className={`footer-section`}>
          <p className={`footer`}>Coding Problem - <a target="_blank" href={"https://www.geektrust.in/coding-problem/frontend/space"}>www.geektrust.in/finding-falcone</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
