// api calls
import axios from 'axios';
import config from '../utils/config'

const api = {}

api.getPlanet = () => {
    let planet = axios.get(`${config.baseUrl}${config.planets}`)
        .then((response) => {
            return response.data;
        }).catch(error => {
            console.log(error)
        });

    return planet;
}

api.getVehicles = () => {
    let vehicles = axios.get(`${config.baseUrl}${config.vehicles}`)
        .then((response) => {
            return response.data;
        }).catch(error => {
            console.log(error)
        });

    return vehicles;
}

api.getToken = () => {
    const options = {
        headers: { 'Accept': 'application/json' }
    };
    let token = axios.post(`${config.baseUrl}${config.token}`, {}, options)
        .then((response) => {
            return response.data;
        }, (error) => {
            console.log(error);
        });

    return token
}

api.findFalcone = (tokenValue, planetArray, vehicleArray) => {
    if (!tokenValue) {
        return;
    }
    const postObj = {
        token: tokenValue,
        "planet_names": planetArray,
        "vehicle_names": vehicleArray,
    }
    const options = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    };
    let result = axios.post(`${config.baseUrl}${config.find}`, postObj, options)
        .then((response) => {
            return response.data;
        }, (error) => {
            console.log(error);
        });

    return result
}

export default api;