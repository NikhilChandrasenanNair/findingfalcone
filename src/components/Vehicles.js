import React, { Component } from 'react';
import { RadioButtonGroup } from './commom/Fields';


export default class Vehicles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, name } = this.props;
        return (
            <>
                {data.map((aVehicle, index) => (
                    <React.Fragment key={`vehicle${index + 1}`}>
                        {index < 1 && (
                            <RadioButtonGroup options={data} name={name} showAdditionalData={true} onChange={this.props.onChange}/>
                        )}
                    </React.Fragment>
                ))}

            </>
        )
    }
}