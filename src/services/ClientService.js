import axios from 'services/custommize-axios.js';
//API Brand
const getAllClient = (queryParams) => {
  return axios.get(`/client/admin`, { params: queryParams })
}
const postNewClient = (x) => {
  return axios.post('/client/admin/create', x)
}
const detailClient = (id) => {
  return axios.get(`/client/admin/detail/${id}`)
}
const updateClient = (x) => {
  return axios.put(`/client/admin/update`, x)
}
const deleteClient = (id) => {
  return axios.patch(`/client/admin/delete`, id)
}
export { getAllClient, postNewClient, detailClient, updateClient, deleteClient };