import React, { Component } from 'react';
import api from '../apis/home';
import Planet from './Planets';
import * as utils from '../utils/utils';
import staticData from '../utils/staticData';



class Main extends Component {
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
        let result = api && api.findFalcone(token, selectedPlanetArray, selectedVehicleArray).then((response) => {
            return response
        });
        return result
    }

    render() {
        const { planets, vehicles } = this.state;

        return (            
            <main className="main-section">
                <h1>{staticData['main-section'].heading}</h1>
                <h3>{staticData['main-section'].description}</h3>
                <div className={`wrapper`}>
                    {!!(planets.length && vehicles.length) && <Planet planetData={planets} vehicleData={vehicles} getToken={this.getToken} findFalcone={this.findFalcone} ref={this.child} />}
                </div>
            </main>
        );
    }
}

export default Main;
