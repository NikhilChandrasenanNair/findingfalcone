import React, { Component } from 'react';
import * as utils from '../../utils/utils';

export class Button extends Component {
    onClick(event) {
        this.props.onClick(event);
    } 
    
    render() {
        return (
            <button className={`btn ${this.props.className}`} onClick={this.onClick.bind(this)}>
                {this.props.text}
            </button>
        );
    }
}

export class Select extends Component {

    render() {
        let {options} = this.props;
        return (
            <div className={`field select`}>
                <select aria-label="planet selector" >
                    {!!(this.props.showlabel) && (
                        <option value={""}>{'Select'}</option>
                    )}
                    
                    {options.map((option, index) => (
                        <option key={`${option.name}${index}`} value={option.name} >
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = utils.getStateFromPropsForDesktop(props);
    }

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        let { options, name } = this.props;
        return (
            <div className={`field dataList`}>
                <input list={name} id={`dataList-${name}`} onChange={this.onChange.bind(this)} value={(this.props.stateData[name] && this.props.stateData[name].planet) ? this.props.stateData[name].planet : ''} />
                <datalist id={name} >      
                    {options.map((option, index) => (
                        <option key={`${option.name}${index}`} value={option.name} data-distance={option.distance}/>
                    ))}
                </datalist>
            </div>
        );
    }
}

export class RadioButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    filterVehicle = (props, event) => {
        
    }

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        let { name, showAdditionalData, stateData } = this.props;        

        return (
            <div className={`field radio-grp`}>
                <div className="values">
                    {stateData.vehicles.map((aVehicle, index) => (
                        <label key={index} className={`radio ${(stateData[name].distance > aVehicle.max_distance) ? 'disabled' : ''}`}>
                            <input type="radio" value={aVehicle.name} name={name} onChange={this.onChange.bind(this)} disabled={((stateData[name].distance > aVehicle.max_distance)) ? true : false}
                                data-max_distance={aVehicle.max_distance} data-speed={aVehicle.speed} data-total_no={aVehicle.total_no} checked={this.props.stateData[name] && this.props.stateData[name].vehicle === aVehicle.name ? true: false}/>
                            <span className={`vehicle-name ${((stateData[name].distance > aVehicle.max_distance)) ? 'disabled' : ''}`}>{aVehicle.name} {!!(showAdditionalData) && <span>({aVehicle.total_no})</span> }</span>
                        </label>
                    ))}
                </div>
            </div>
        );
    }
}