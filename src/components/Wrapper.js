import React, { Component } from 'react';
import Planets from './Planets';

export default class Wrapper extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { planetData, vehicleData } = this.props;
        return (
            <>
                <Planets planetData={planetData} vehicleData={vehicleData}/>
            </>
        )
    }
}