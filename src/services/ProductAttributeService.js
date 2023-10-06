import axios from 'services/custommize-axios2.js';

//API Brand
const getAllBrand = () => {
    return axios.get(`/brand.json`)
}

const postCreateBrands = (code, name) => {
    return axios.post('/brand.json', { code, name })
}

const updateBrand = (id, code, name) => {
    return axios.put(`/brand/${id}.json`, { code, name })
}
const deleteBrand = (id) => {
    return axios.delete(`/brand/${id}.json`)
}

//API Origin
const getAllOrigin = () => {
    return axios.get(`/origin.json`)
}


//API DesignStyle

const getAllDesignStyle = () => {
    return axios.get(`/designstyle.json`)
}

//API Skin_Type
const getAllSkinType = () => {
    return axios.get(`/skintype.json`)
}

//API Toe
const getAllToe = () => {
    return axios.get(`/toe.json`)
}

//API Sole
const getAllSole = () => {
    return axios.get(`/sole.json`)
}

//API Lining
const getAllLining = () => {
    return axios.get(`/lining.json`)
}

//API Cushion
const getAllCushion = () => {
    return axios.get(`/cushion.json`)
}
export { getAllBrand, postCreateBrands, updateBrand, deleteBrand ,
    getAllOrigin,
    getAllDesignStyle,
    getAllSkinType,
    getAllToe,
    getAllSole,
    getAllLining,
    getAllCushion
};