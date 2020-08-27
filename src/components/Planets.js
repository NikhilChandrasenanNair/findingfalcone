import React, {Component} from 'react';
import Vehicles from './Vehicles';
import {DataList} from './commom/Fields';
import config from '../utils/config';
import { Link, } from "react-router-dom";

export default class Planets extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    onPlanetSelect = (event) => {
        let key = event.target.id.split('-')[1];
        let value = event.target.value;
        let distance = value && this.filterMethod(value, 'distance');

        let planetObj = {
            [key]: {
                ...this.props.stateValue[key],
                planet: value,
                distance,
            }
        }

        this.props.selectPlanet(planetObj);
    }

    onVehicleSelect = (event) => {
        let { name, value, dataset: { speed } } = event.target;
        let vehicleObj = {
            [name]: {
                vehicle: value,
                speed,
            }
        }
        this.props.selectVehicle(vehicleObj);
    }

    clearVehicle = (key, state) => {

        if (!state.selectedPlanetArray.includes(state[key].planet)) {
            let index = state.selectedVehicleArray.indexOf(state[key].vehicle);
            return state.selectedVehicleArray.splice(index, 1);
        }

        return state.selectedVehicleArray;

    }

    filterMethod = (value, unit) => {
        let returnValue = this.props.planetData.filter((planet) =>  planet.name === value )

        if (returnValue.length) {
            return returnValue[0][unit];
        } 
        
        return ""
    }

    findFalcone = () => {
        this.props.getToken().then((response) => {
            const { selectedPlanetArray, selectedVehicleArray } = this.props.stateValue;
            this.props.findFalcone(response.token, selectedPlanetArray, selectedVehicleArray );
        });
    }

    filterOutPlanets = (planetData) => {
        let returnObj =  planetData.filter((aPlanet) => {
            return !this.props.stateValue.selectedPlanetArray.includes(aPlanet.name)
        })

        return returnObj;

    }

    render() {
        let { planetData } = this.props;
        if(this.props.stateValue.selectedPlanetArray.length) {
            planetData = this.filterOutPlanets(planetData)
        }
        return (
            <>
                {[...Array(config.destionationNumber)].map((aPlanet, index) => (
                    <React.Fragment key={`destination${index + 1}`}>
                        <div className={`destination`}>
                            <div className={`destination-details`}>{`Destination${index + 1}`}</div>
                            <DataList options={planetData} name={`destination${index + 1}`} onChange={this.onPlanetSelect} ref={this.child} stateData={this.props.stateValue}/>

                            {!!(this.props.stateValue[`destination${index + 1}`] && this.props.stateValue[`destination${index + 1}`].planet) && 
                                (<Vehicles data={this.props.stateValue.vehicles} stateData={this.props.stateValue} name={`destination${index + 1}`} onChange={this.onVehicleSelect}/>) 
                            }

                        </div>
                    </React.Fragment>                
                ))}

                <div className={'total-time-taken'}>Time Taken: {this.props.stateValue.totalTime}</div>

                <Link to={{ pathname: `/result`, state: { ...this.props.stateValue } }} className={'find-falcone-link'} onClick={() => this.findFalcone(this)}>
                    Find Falcone
                </Link>

            </>
        )
    }
}