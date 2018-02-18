<template>
<v-toolbar dark color="primary" fixed app>
  <v-toolbar-title>
    <a @click="$router.push('/')" class="logo">
      SocialOrder
    </a>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items class="hidden-sm-and-down" v-if="!this.isUserLoggedIn">
    <v-btn flat dark @click.stop="register = true">Register</v-btn>
    <v-dialog v-model="register" width="500">
      <register></register>
    </v-dialog>
    <v-btn flat dark @click.stop="login = true">Login</v-btn>
    <v-dialog v-model="login" width="500">
      <login></login>
    </v-dialog>
  </v-toolbar-items>
  <v-toolbar-items class="hidden-sm-and-down" v-if="this.isUserLoggedIn">
    <v-btn flat dark @click="profile">Profile</v-btn>
    <v-btn flat dark @click="logout">Log Out</v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
import login from '@/components/alerts/login'
import register from '@/components/alerts/register'
import {mapState} from 'vuex'

export default {
  name: 'navbar',
  components: {
    login,
    register
  },
  data () {
    return {
      login: false,
      register: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    async profile () {
      const username = this.user.username
      this.$router.push(`/profile/${username}`)
    },
    async logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<style scoped>
.logo{
  color: white;
}
</style>
