import React, { Component } from 'react';
import api from '../apis/home';
import Planet from './Planets';
import * as utils from '../utils/utils';
import staticData from '../utils/staticData';



class Main extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    reset = () => {
        this.child.current.getAlert();
    };
    
    render() {
        const { stateValue: { planets, vehicles }, getToken, findFalcone, selectPlanet, selectVehicle } = this.props;

        return (            
            <main className="main-section">
                <h1>{staticData['main-section'].heading}</h1>
                <h3>{staticData['main-section'].description}</h3>
                <div className={`wrapper`}>
                    {!!(planets.length && vehicles.length) && <Planet 
                                                                stateValue={this.props.stateValue} 
                                                                planetData={planets} 
                                                                vehicleData={vehicles} 
                                                                getToken={getToken} 
                                                                findFalcone={findFalcone} 
                                                                selectPlanet={selectPlanet} 
                                                                selectVehicle={selectVehicle} 
                                                                ref={this.child} />}
                </div>
            </main>
        );
    }
}

export default Main;
