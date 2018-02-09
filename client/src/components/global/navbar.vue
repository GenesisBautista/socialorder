<template>
<v-toolbar dark color="primary" fixed app>
  <v-toolbar-title>
    <a @click="$router.push('/')" class="logo">
      SocialOrder
    </a>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
  <v-toolbar-items class="hidden-sm-and-down" v-if="!$store.state.isUserLoggedIn">
    <v-btn flat @click.stop="register = true">Register</v-btn>
    <v-dialog v-model="register" max-width="500px">
      <register></register>
    </v-dialog>
    <v-btn flat @click.stop="login = true">Login</v-btn>
    <v-dialog v-model="login" max-width="500px">
      <login></login>
    </v-dialog>
  </v-toolbar-items>
  <v-toolbar-items class="hidden-sm-and-down" v-if="$store.state.isUserLoggedIn">
    <v-btn flat @click="logout">Log Out</v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
import register from '../alerts/register'
import login from '../alerts/login'

export default {
  name: 'navbar',
  components: {
    register,
    login
  },
  data () {
    return {
      register: false,
      login: false,
      user: null
    }
  },
  methods: {
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
