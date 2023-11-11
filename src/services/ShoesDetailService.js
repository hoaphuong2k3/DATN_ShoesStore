import axios from 'services/custommize-axios.js';

const getAllShoesDetail = (id, page, size, search) => {
  return axios.post(`/admin/shoesdetail/search/${id}?page=${page}&size=${size}`, search)
}

const getAllShoesDetail2 = (id, page, size, search) => {
  return axios.post(`/admin/shoesdetail/search/${id}?page=${page}&size=${size}`, search)
}

const postNewShoes = (shoes) => {
  return axios.post('/admin/shoes', shoes, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const findShoes = (id) => {
  return axios.get(`/admin/shoes/${id}`)
}

const updateShoes = (id, shoes) => {
  return axios.put(`/admin/shoes/${id}`, shoes, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
const deleteShoes = (id) => {
  return axios.delete('/admin/shoes/delete', id)
}
export { getAllShoesDetail, postNewShoes, findShoes, updateShoes, deleteShoes, getAllShoesDetail2 };