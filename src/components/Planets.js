import React, {Component} from 'react';
import Vehicles from './Vehicles';
import {DataList} from './commom/Fields';

export default class Planets extends Component {
    state = {
        totalTime: 0
    }

    onPlanetSelect = (event) => {
        let key = event.target.id.split('-')[1];
        let value = event.target.value;
        this.setState({
            [key]: {
                ...this.state[key],
                planet: value,
            }
        })
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
        const { planetData, vehicleData } = this.props;
        return (
            <>
                {planetData.map((aPlanet, index) => (
                    <React.Fragment key={`destination${index + 1}`}>
                    {index <= 3 && (
                        <div className={`destination`}>
                            <div className={`destination-details`}>{`Destination${index + 1}`}</div>
                            <DataList options={planetData} name={`destination${index + 1}`} onChange={this.onPlanetSelect}/>
                            {!!(this.state[`destination${index + 1}`]) && (<Vehicles data={vehicleData} name={`destination${index + 1}`} onChange={this.onVehicleSelect}/>) }
                        </div>
                    )}
                    </React.Fragment>                
                ))}

                <div className={'total-time-taken'}>Time Taken: </div>

            </>
        )
    }
}