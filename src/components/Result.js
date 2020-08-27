import React, { Component } from 'react';
import staticData from '../utils/staticData';
import { Link, } from "react-router-dom";
export default class Result extends Component {    
    render() {
        return (
            <>
                {(this.props.stateValue.result.planet_name && this.props.stateValue.result.status !== false) ? (<>
                    <h1>{staticData['result-section'].heading}</h1>
                    <h3>{staticData['result-section'].success}</h3>
                    <h3>{staticData['result-section'].timeTaken} {this.props.stateValue.totalTime}</h3>
                    <h3>{staticData['result-section'].planetFound} {this.props.stateValue.result.planet_name}</h3>
                </>) : (<>
                    <h1>{staticData['result-section'].heading}</h1>
                    <h3>{staticData['result-section'].fail}</h3>
                </>)}

                <Link to={{ pathname: `/` }} className={'find-falcone-link'} onClick={() => this.props.reset(this)}>
                    Start Again
                </Link>
            </>
        )
    }
}