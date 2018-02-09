import axios from 'axios'

export default {
  mongoService () {
    return axios.create({
      baseURL: 'http://localhost:8081'
    })
  }
}
