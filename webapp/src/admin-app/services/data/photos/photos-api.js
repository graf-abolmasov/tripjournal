import axios from 'axios'

export default {
  create: (photo) => {
    return axios.post('/api/photo_sources', photo)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }
}