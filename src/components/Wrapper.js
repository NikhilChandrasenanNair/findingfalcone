import React, { Component } from 'react';
import Planets from './Planets';

export default class Wrapper extends Component {
    
    render() {
        const { planetData, vehicleData, getToken, findFalcone } = this.props;
        return (
            <>
                <Planets planetData={planetData} vehicleData={vehicleData} getToken={getToken} findFalcone={findFalcone}/>
            </>
        )
    }
}