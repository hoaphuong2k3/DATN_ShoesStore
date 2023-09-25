import axios from 'services/custommize-axios.js';

const getAll = () => {
    return axios.get(`/brand`)
}

const postCreateBrands = (code, name) => {
    return axios.post('/brand', { code, name })
}

const updateBrand = (id, code, name) => {
    return axios.put(`/brand/${id}`, { code, name })
}
const deleteBrand = (id) => {
    return axios.delete(`/brand/${id}`)
}
export { getAll, postCreateBrands, updateBrand, deleteBrand };