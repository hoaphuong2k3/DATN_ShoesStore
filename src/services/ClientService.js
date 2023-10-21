import axios from 'services/custommize-axios.js';
//API Brand
const getAllClient = () => {
    return axios.get(`/client/admin`)
}
export { getAllClient };