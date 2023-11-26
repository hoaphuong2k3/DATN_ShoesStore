import axios from 'services/custommize-axios.js';

const getAllImage = (id) => {
  return axios.get(`/admin/image/dowload/${id}`)
}

const postNewImage = (id, image) => {
  return axios.post(`/admin/image/upload-multipart/${id}`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const updateImage = (id, image) => {
  return axios.put(`/admin/image/${id}`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
const deleteImage = (id) => {
  return axios.delete('/admin/image/delete', id)
}
export { getAllImage, updateImage, postNewImage, deleteImage };