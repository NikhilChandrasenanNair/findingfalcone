import React, {Component} from 'react';
import api from './apis/home';
import Planet from './components/Planets';
import * as utils from './utils/utils';
import staticData from './utils/staticData';
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

  render() {  
    const { planets, vehicles } = this.state;  
    return (
      <div className="App">
        <header className={`header-section`}>
          <a href={'#'}>{staticData['header-section'].reset}</a> | 
          <a href={staticData['header-section'].geektrust.link} target="_blank">{staticData['header-section'].geektrust.name}</a>
        </header>
        <main className="main-section">
          <h1>{staticData['main-section'].heading}</h1>
          <h3>{staticData['main-section'].description}</h3>
          <div className={`wrapper`}>
            {!!(planets.length && vehicles.length) && <Planet planetData={planets} vehicleData={vehicles} getToken={this.getToken} findFalcone={this.findFalcone} />}
          </div>
        </main>
        <footer className={`footer-section`}>
          <p className={`footer`}>{staticData['footer-section'].para} - <a target="_blank" href={staticData['footer-section'].geektrust.link}>{staticData['footer-section'].geektrust.name}</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
