import api from '@/services/api'

export default {
  profile (username) {
    return api().get(`users/profile/${username}`)
  }
}
