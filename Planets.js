import React, {Component} from 'react';
import Vehicles from './Vehicles';
import {DataList} from './commom/Fields';

export default class Planets extends Component {
    state = {
        totalTime: 0,
        selectedPlanetArray: []
    }

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
                selectedPlanetArray: this.planetArray(),
            })
        })
    }

    filterMethod = (value, unit) => {
        let returnValue = this.props.planetData.filter((planet) =>  planet.name === value )
        return returnValue[0][unit];
    }

    planetArray = _ => {
        let returnValue = Object.keys(this.state).map((anItem) => {
            if (toString.call(this.state[anItem]) === "[object Object]") {
                return this.state[anItem].planet
            }
        }).filter((anItem) => {
            return !!Boolean(anItem) && anItem 
        });

        return returnValue;
    }

    onVehicleSelect = (event) => {
        let {name, value} = event.target;
        this.setState({
            [name]: {
                ...this.state[name],
                vehicle: value,
            }
        })
    }

    render() {
        let { planetData, vehicleData } = this.props;

        if(this.state.selectedPlanetArray.length) {
            planetData = planetData.filter((aPlanet) => {
                return !this.state.selectedPlanetArray.includes(aPlanet.name)
            })
        }


        return (
            <>
                {[1,2,3,4].map((aPlanet, index) => (
                    <React.Fragment key={`destination${index + 1}`}>
                    {index <= 3 && (
                        <div className={`destination`}>
                            <div className={`destination-details`}>{`Destination${index + 1}`}</div>
                                <DataList options={planetData} name={`destination${index + 1}`} onChange={this.onPlanetSelect} />
                                {!!(this.state[`destination${index + 1}`] && this.state[`destination${index + 1}`].planet) && (<Vehicles data={vehicleData} stateData={this.state} name={`destination${index + 1}`} onChange={this.onVehicleSelect}/>) }
                        </div>
                    )}
                    </React.Fragment>                
                ))}

                <div className={'total-time-taken'}>Time Taken: </div>

            </>
        )
    }
}