import axios from 'services/custommize-axios.js';

const getAllShoes = (page, size, search) => {
    return axios.post(`/admin/shoes/search?page=${page}&size=${size}`, search)
}

const postNewShoes = (shoes) => {
    return axios.post('/admin/shoes', shoes)
}

const updateBrand = (id, code, name) => {
    return axios.put(`/brand/${id}`, { code, name })
}
const deleteBrand = (id) => {
    return axios.delete(`/brand/${id}`)
}
export { getAllShoes, postNewShoes, updateBrand, deleteBrand };