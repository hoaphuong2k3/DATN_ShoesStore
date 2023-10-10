import axios from 'services/custommize-axios.js';
//API Brand
const getAllBrand = () => {
    return axios.get(`/admin/brand/get-all`)
}

const postCreateBrands = (code, name) => {
    return axios.post('/admin/brand', { code, name })
}

const updateBrand = (id, code, name) => {
    return axios.put(`/admin/brand/${id}`, { code, name })
}
const deleteBrand = (id) => {
    return axios.delete(`/admin/brand/${id}`)
}

//API Origin
const getAllOrigin = () => {
    return axios.get(`/admin/origin/get-all`)
}


//API DesignStyle

const getAllDesignStyle = () => {
    return axios.get(`/admin/design-style/get-all`)
}

//API Skin_Type
const getAllSkinType = () => {
    return axios.get(`/admin/skin-tyle/get-all`)
}

//API Toe
const getAllToe = () => {
    return axios.get(`/admin/toe/get-all`)
}

//API Sole
const getAllSole = () => {
    return axios.get(`/admin/sole/get-all`)
}

//API Lining
const getAllLining = () => {
    return axios.get(`/admin/lining/get-all`)
}

//API Cushion
const getAllCushion = () => {
    return axios.get(`/admin/cushion/get-all`)
}

//Get size có id shoes
const getAllSizeId = (id) => {
    return axios.get(`/user/shoes/get-all-size/${id}`)
}

//Get Coler có id shoes

const getAllColorId = (id) => {
    return axios.get(`/user/shoes/get-all-color/${id}`)
}

//Get size 
const getAllSize = () => {
    return axios.get(`/admin/size/get-all`)
}

//Get Coler

const getAllColor = () => {
    return axios.get(`/admin/color/get-all`)
}
export { getAllBrand, postCreateBrands, updateBrand, deleteBrand ,
    getAllOrigin,
    getAllDesignStyle,
    getAllSkinType,
    getAllToe,
    getAllSole,
    getAllLining,
    getAllCushion,
    getAllSizeId,
    getAllColorId,
    getAllSize,
    getAllColor
};