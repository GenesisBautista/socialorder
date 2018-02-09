import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
import Profile from '@/components/profile'
import MatchDetails from '@/components/matchdetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/matchdetails',
      name: 'Match Details',
      component: MatchDetails
    }
  ]
})
