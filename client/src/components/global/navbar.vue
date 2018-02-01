<template>
<v-toolbar dark color="primary" fixed v-scroll="onScroll">
  <v-toolbar-title>SocialOrder</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
  <v-toolbar-items class="hidden-sm-and-down">
    <v-btn flat @click.stop="register = true">Register</v-btn>
    <v-dialog v-model="register" max-width="500px">
      <register></register>
    </v-dialog>
    <v-btn flat to="/login">Login</v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
import register from '../alerts/register'

export default {
  name: 'navbar',
  components: {
    register
  },
  data () {
    return {
      register: false,
      user: null
    }
  }
}
</script>

<style scoped>
</style>
