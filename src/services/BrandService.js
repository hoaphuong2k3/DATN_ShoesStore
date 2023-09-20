import axios from './custommize-axios';

const getAll = () => {
    return axios.get(`/brandshoesdetails.json`)
}

const postCreateBrands = (code, name) => {
    return axios.post('/api/brand', { code, name })
}

const updateBrand = (id, code, name) => {
    return axios.put(`/api/brand/${id}`, { code, name })
}
const deleteBrand = (id) => {
    return axios.delete(`/api/brand/${id}`)
}
export { getAll, postCreateBrands, updateBrand, deleteBrand };