import React, { Component } from 'react';
import staticData from '../utils/staticData';

export default class Result extends Component {
    render() {
        return (
            <>
                <h1>{staticData['result-section'].heading}</h1>
                <h3>{this.props.stateValue.result.status === false ? staticData['result-section'].fail : staticData['result-section'].success}</h3>
                <h3>{staticData['result-section'].timeTaken} {this.props.stateValue.totalTime}</h3>
                <h3>{staticData['result-section'].planetFound} {this.props.stateValue.result.planet_name}</h3>
            </>
        )
    }
}