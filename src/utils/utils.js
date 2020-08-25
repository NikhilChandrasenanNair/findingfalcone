// utility functions
export function getStateFromPropsForDesktop(props) {
    const state = getStateFromProps(props);
    return state;
}

function getStateFromProps(props) {
    const state = {
        planets: [],
        token: '',
        totalTime: 0,
        selectedPlanetArray: [],
        selectedVehicleArray: [],
        vehicles: props.vehicleData || [],
        reset: false,
        result: {
            planet_name: '',
            status: false
        }
    }
    
    return state;
}