import React, { Component } from 'react';

export class Button extends Component {
    onClick(event) {
        this.props.onClick(event);
    }
    
    render() {
        return (
            <button className={`btn ${this.props.className}`} onClick={this.onClick.bind(this)}>
                Find Falcone
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

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        let { options, name } = this.props;
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

    // componentDidMount() {
    //     if (this.props.stateData.selectedVehicleArray.length){
    //         this.filterVehicle(this.props)
    //     } 
    // }    

    // filterVehicle = (props) => {
    //     let planetArray = [...props.options];
    //     props.stateData.selectedVehicleArray.map((aVehicle) => {
    //         planetArray.map((anItem, index) => {
    //             if (anItem.name === aVehicle) {
    //                 anItem.total_no = anItem.total_no - 1
    //             }
    //             return anItem
    //         })
    //     })
    // }

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        let { options, name, showAdditionalData, stateData} = this.props;

        return (
            <div className={`field radio-grp`}>
                <div className="values">
                    {options.map((aVehicle, index) => (
                        <label key={index} className={`radio ${((stateData[name].distance > aVehicle.max_distance) || aVehicle.total_no < 1) ? 'disabled' : ''}`}>
                            <input type="radio" value={aVehicle.name} name={name} onChange={this.onChange.bind(this)} disabled={((stateData[name].distance > aVehicle.max_distance) || aVehicle.total_no < 1) ? true : false}
                                data-max_distance={aVehicle.max_distance} data-speed={aVehicle.speed} data-total_no={aVehicle.total_no} />
                            <span className={`vehicle-name ${((stateData[name].distance > aVehicle.max_distance) || aVehicle.total_no < 1) ? 'disabled' : ''}`}>{aVehicle.name} {!!(showAdditionalData) && <span>({aVehicle.total_no < 0 ? 0 : aVehicle.total_no})</span> }</span>
                        </label>
                    ))}
                </div>
            </div>
        );
    }
}