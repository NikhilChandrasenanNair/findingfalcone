import React, { Component } from 'react';

export class Button extends Component {
    render() {
        return (
            <button>
                
            </button>
        );
    }
}

export class Select extends Component {
    constructor(props) {
        super(props);        
    }
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
    }

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        let {options, name} = this.props;
        return (
            <div className={`field dataList`}>
                <input list={name} id={`dataList-${name}`} onChange={this.onChange.bind(this)}/>
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

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        let { options, name, showAdditionalData} = this.props;
        return (
            <div className={`field radio-grp`}>
                <div className="values">
                    {options.map((aVehicle, index) => (
                        <label key={index} className="radio">
                            <input type="radio" value={aVehicle.name} name={name} onChange={this.onChange.bind(this)} 
                                data-max_distance={aVehicle.max_distance} data-speed={aVehicle.speed} data-total_no={aVehicle.total_no} />
                            <span>{aVehicle.name} {!!(showAdditionalData) && <span>({aVehicle.total_no})</span> }</span>
                        </label>
                    ))}
                </div>
            </div>
        );
    }
}