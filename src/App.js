import React, {Component} from 'react';
import api from './apis/home';
import Main from './components/Main';
import Result from './components/Result';
import * as utils from './utils/utils';
import staticData from './utils/staticData';
import { Route, Switch } from 'react-router-dom';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = utils.getStateFromPropsForDesktop(props);
    this.child = React.createRef();
  } 
  
  componentDidMount() {
    this.getPlanets();
    this.getVehicles();  
  }

  reset = () => {
    this.child.current.getAlert();
  };

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
    return (
      <div className="App">
        <header className={`header-section`}>
          <a href={'#'} onClick={this.reset}>{staticData['header-section'].reset}</a> | 
          <a href={staticData['header-section'].geektrust.link} target="_blank">{staticData['header-section'].geektrust.name}</a>
        </header>
        <main className="main-section">

          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/result" component={Result} />
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
