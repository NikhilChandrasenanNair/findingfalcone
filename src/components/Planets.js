import React, {Component} from 'react';
import Vehicles from './Vehicles';
import {DataList, Button} from './commom/Fields';
import config from '../utils/config';


export default class Planets extends Component {
    state = {
        totalTime: 0,
        selectedPlanetArray: [],
        selectedVehicleArray: [],
        //planets: this.props.planetData || [],
        vehicles: this.props.vehicleData || [],
        token: '',
    }

    // filterVehicle = (state) => {
    //     state.selectedVehicleArray.map((aVehicle) => {
    //         state.vehicles.map((anItem) => {
    //             if (anItem.name === aVehicle && anItem.total_no >= 0) {
    //                 anItem.total_no = anItem.total_no - 1
    //             }
    //             return anItem
    //         })
    //     })
    // }

    onPlanetSelect = (event) => {
        let key = event.target.id.split('-')[1];
        let value = event.target.value;
        let distance = value && this.filterMethod(value, 'distance');
        
        this.setState({
            [key]: {
                ...this.state[key],
                planet: value,
                distance,
            }
        }, () => {
            this.setState({
                selectedPlanetArray: this.arrayCreator('planet'),
                //selectedVehicleArray: this.clearVehicle(key, this.state),
            })
        })
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

    arrayCreator = (selector) => {
        let returnValue = Object.keys(this.state).map((anItem) => {
            if (toString.call(this.state[anItem]) === "[object Object]") {
                return this.state[anItem][selector]
            }
            return null;
        }).filter((anItem) => {
            return !!Boolean(anItem) && anItem 
        });

        return returnValue;
    }

    onVehicleSelect = (event) => {
        let {name, value, dataset : {speed} } = event.target;
        this.setState({
            [name]: {
                ...this.state[name],
                vehicle: value,
                speed: speed,
            }
        }, () => {
            this.setState({
                selectedVehicleArray: this.arrayCreator('vehicle'),
                totalTime: this.state.totalTime + (this.state[name].distance / this.state[name].speed),
            }, () => {
                    if (this.state.selectedVehicleArray.length) {
                       // this.filterVehicle(this.state)
                    }
            })
        })        
    }

    findFalcone = () => {
        this.props.getToken().then((response) => {
            this.setState({
                token: response.token
            }, () => {
                    const { token, selectedPlanetArray, selectedVehicleArray } = this.state;
                    this.props.findFalcone(token, selectedPlanetArray, selectedVehicleArray )
            })
        });
    }

    render() {
        let { planetData } = this.props;

        if(this.state.selectedPlanetArray.length) {
            planetData = planetData.filter((aPlanet) => {
                return !this.state.selectedPlanetArray.includes(aPlanet.name)
            })
        }

        return (
            <>
                {[...Array(config.destionationNumber)].map((aPlanet, index) => (
                    <React.Fragment key={`destination${index + 1}`}>
                        <div className={`destination`}>
                            <div className={`destination-details`}>{`Destination${index + 1}`}</div>
                                <DataList options={planetData} name={`destination${index + 1}`} onChange={this.onPlanetSelect} />
                            {!!(this.state[`destination${index + 1}`] && this.state[`destination${index + 1}`].planet) && (<Vehicles data={this.state.vehicles} stateData={this.state} name={`destination${index + 1}`} onChange={this.onVehicleSelect}/>) }
                        </div>
                    </React.Fragment>                
                ))}

                <div className={'total-time-taken'}>Time Taken: {this.state.totalTime}</div>

                <Button className={'find-falcone-btn'} onClick={() => this.findFalcone(this)} />

            </>
        )
    }
}