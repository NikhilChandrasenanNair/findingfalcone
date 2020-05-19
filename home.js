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
    axios.post(`${config.baseUrl}${config.token}`, {}, options)
        .then((response) => {
            console.log("Token: ", response);
        }, (error) => {
            console.log(error);
        });
}

export default api;