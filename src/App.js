import React, {Component} from 'react';
import api from './apis/home';
import Main from './components/Main';
import Result from './components/Result';
import staticData from './utils/staticData';
import { Route, Switch } from 'react-router-dom';


import './App.css';

class App extends Component {

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
