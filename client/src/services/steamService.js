import api from '@/services/api'

const steamKey = 'BDB115C9B60B4823AA5F304E9C8B60F9'

export default {
  getMatch (matchID) {
    return api().get('IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + matchID + '&key=' + steamKey)
  },
  getHeroes () {
    return api().get('IEconDOTA2_570/GetHeroes/v1')
  }
}
