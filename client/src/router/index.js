import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
import Profile from '@/components/profile/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile/:username',
      name: 'Profile',
      component: Profile
    }
  ]
})
