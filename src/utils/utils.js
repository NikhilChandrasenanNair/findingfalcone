// utility functions
export function getStateFromPropsForDesktop(props) {
    const state = getStateFromProps(props);
    return state;
}

export function resetState() {
    this.setState({
        ...this.state,
        token: '',
        totalTime: 0,
        selectedPlanetArray: [],
        selectedVehicleArray: [],
    })
}

function getStateFromProps(props) {
    const state = {
        planets: [],
        token: '',
        totalTime: 0,
        selectedPlanetArray: [],
        selectedVehicleArray: [],
        vehicles: props.vehicleData || [],
    }
    
    return state;
}