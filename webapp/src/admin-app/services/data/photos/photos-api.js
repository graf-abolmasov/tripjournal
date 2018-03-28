import { get, post } from '../api'

export default {
  create: (photo) => post('/api/photo_sources.json', photo),
  all: () => get('/api/photo_sources.json')
}