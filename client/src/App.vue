<template>
<div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <navbar></navbar>
  <drawer></drawer>
  <main class="mdl-layout__content">
    <router-view/>
  </main>
</div>
</template>

<script>
import navbar from './components/global/navbar'
import drawer from './components/global/drawer'

export default {
  name: 'App',
  components: {
    navbar,
    drawer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.demo-layout-transparent {
  background: url('./assets/transparent.jpg') center / cover;
}
</style>
