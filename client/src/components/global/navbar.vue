<template>
<header class="mdl-layout__header">
  <div class="mdl-layout__header-row">
    <!-- Title -->
    <span class="mdl-layout-title">Title</span>
    <!-- Add spacer, to align navigation to the right -->
    <div class="mdl-layout-spacer"></div>
    <!-- Navigation -->
    <nav class="mdl-navigation" v-if="!user">
      <router-link class="mdl-navigation__link" to="/register">Register</router-link>
      <router-link class="mdl-navigation__link" to="/">Login</router-link>
    </nav>
    <nav class="mdl-navigation" v-else>
      <router-link class="mdl-navigation__link" to="/">Logout</router-link>
      <router-link class="mdl-navigation__link" to="/"><i class="material-icons navbar-profile-picture">&#xE853;</i></router-link>
    </nav>
  </div>
</header>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      user: false
    }
  }
}
</script>

<style scoped>
</style>
