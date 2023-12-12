import axios from 'services/custommize-axios.js';
//API Brand
const getAllBrand = () => {
    return axios.get(`/admin/brand/get-all`)
}
const getAllBrand1 = (page, size, search) => {
    return axios.post(`/admin/brand/search?page=${page}&size=${size}`, search)
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
const getAllOrigin1 = (page, size, search) => {
    return axios.post(`/admin/origin/search?page=${page}&size=${size}`, search)
}


//API DesignStyle

const getAllDesignStyle = () => {
    return axios.get(`/admin/design-style/get-all`)
}
const getAllDesignStyle1 = (page, size, search) => {
    return axios.post(`/admin/design-style/search?page=${page}&size=${size}`, search)
}

//API Skin_Type
const getAllSkinType = () => {
    return axios.get(`/admin/skin-type/get-all`)
}
const getAllSkinType1 = (page, size, search) => {
    return axios.post(`/admin/skin-type/search?page=${page}&size=${size}`, search)
}

//API Toe
const getAllToe = () => {
    return axios.get(`/admin/toe/get-all`)
}
const getAllToe1 = (page, size, search) => {
    return axios.post(`/admin/toe/search?page=${page}&size=${size}`, search)
}

//API Sole
const getAllSole = () => {
    return axios.get(`/admin/sole/get-all`)
}
const getAllSole1 = (page, size, search) => {
    return axios.post(`/admin/sole/search?page=${page}&size=${size}`, search)
}

//API Lining
const getAllLining = () => {
    return axios.get(`/admin/lining/get-all`)
}
const getAllLining1 = (page, size, search) => {
    return axios.post(`/admin/lining/search?page=${page}&size=${size}`, search)
}

//API Cushion
const getAllCushion = () => {
    return axios.get(`/admin/cushion/get-all`)
}
const getAllCushion1 = (page, size, search) => {
    return axios.post(`/admin/cushion/search?page=${page}&size=${size}`, search)
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
const getAllSize1 = (page, size, search) => {
    return axios.post(`/admin/size/search?page=${page}&size=${size}`, search)
}

//Get Coler

const getAllColor = () => {
    return axios.get(`/admin/color/get-all`)
}
const getAllColor1 = (page, size, search) => {
    return axios.post(`/admin/color/search?page=${page}&size=${size}`, search)
  }
  
export { getAllBrand, postCreateBrands, updateBrand, deleteBrand ,getAllBrand1,
    getAllOrigin,getAllOrigin1,
    getAllDesignStyle,getAllDesignStyle1,
    getAllSkinType,getAllSkinType1,
    getAllToe,getAllToe1,
    getAllSole,getAllSole1,
    getAllLining,getAllLining1,
    getAllCushion,getAllCushion1,
    getAllSizeId,
    getAllColorId,
    getAllSize,getAllSize1,
    getAllColor,getAllColor1
};