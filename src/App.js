import React, {Component} from 'react';
import Main from './components/Main';
import Result from './components/Result';
import staticData from './utils/staticData';
import { Route, Switch } from 'react-router-dom';
import api from './apis/home';
import * as utils from './utils/utils';

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

  getPlanets() {
    api.getPlanet().then((response) => {
      this.setState({
        planets: response,
      })
    })
  }

  getVehicles() {
    api.getVehicles().then((response) => {
      this.setState({
        vehicles: response,
      })
    })
  }

  getToken() {
    let token = api && api.getToken().then((response) => {
      return response
    });
    return token
  }

  findFalcone = (token, selectedPlanetArray, selectedVehicleArray) => {
    api && api.findFalcone(token, selectedPlanetArray, selectedVehicleArray).then((response) => {
      return response
    }).then((response) => {
      this.setState({
        result: {
          planet_name: response.planet_name,
          status: response.status === false ? 'Not Found' : 'Success! '
        }
      })
    })
  }

  arrayCreator = (selectorValue) => {
    let destinationArray = Object.keys(this.state).filter((item) => {
      return item.includes('destination');
    })

    let returnArray = [];

    destinationArray.forEach((destination) => {
      returnArray.push(this.state[destination][selectorValue])
    })

    return returnArray
  }

  selectPlanet = (planet) => {
    this.setState({
      ...this.state,
      ...planet,
      
    }, () => {
      this.setState({
        selectedPlanetArray: this.arrayCreator('planet'),
      })
    })
  }

  selectVehicle = (vehicle) => {
    this.setState({
      [Object.keys(vehicle)[0]] : {
        ...this.state[Object.keys(vehicle)[0]],
        ...vehicle[Object.keys(vehicle)]
      }
    }, () => {
      this.setState({
        selectedVehicleArray: this.arrayCreator('vehicle'),
        totalTime: this.totalTime(),
      })
    })
  }

  totalTime = (value) => {
    let time = 0;
    let destinationArray = Object.keys(this.state).filter((item) => {
      return item.includes('destination');
    })

    destinationArray.forEach((destination) => {
      if (this.state[destination].distance && this.state[destination].speed) {
        time = time + (this.state[destination].distance / this.state[destination].speed)
      }else {
        time = 0
      }
    })

    return time;
  }

  render() {  
    return (
      <div className="App">
        <header className={`header-section`}>
          <a href={'#'} onClick={this.reset}>{staticData['header-section'].reset}</a> | 
          <a href={staticData['header-section'].geektrust.link} target="_blank">{staticData['header-section'].geektrust.name}</a>
        </header>

        <main className="main-section">
          <Switch>
            <Route path="/" exact render={() => (
              <Main stateValue={this.state} getToken={this.getToken} findFalcone={this.findFalcone} selectPlanet={this.selectPlanet} selectVehicle={this.selectVehicle}/>
            )} />
            <Route path="/result" render={() => (
              <Result stateValue={this.state}/>
            )} />
          </Switch>
        </main>
        <footer className={`footer-section`}>
          <p className={`footer`}>{staticData['footer-section'].para} - <a target="_blank" href={staticData['footer-section'].geektrust.link}>{staticData['footer-section'].geektrust.name}</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
