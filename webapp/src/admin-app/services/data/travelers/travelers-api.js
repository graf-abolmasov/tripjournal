import axios from 'axios'

export default {
  all: () => {
    return axios.get('/api/travelers')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }
}