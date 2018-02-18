<template>
<v-carousel hide-delimiters style="height:100%">
  <v-carousel-item src="/static/hero/1.jpg" key=0>
    <v-container grid-list-xl text-xs-left>
      <v-flex xs4>
        <h1 class="display-3 grey--text text--lighten-3">Cras</h1>
        <p class="headline grey--text text--lighten-3">facilisis mi vitae nunc lobortis pharetra.</p>
      </v-flex>
    </v-container>
  </v-carousel-item>

  <v-carousel-item src="/static/hero/2.jpg" key=1>
    <v-container grid-list-xl text-xs-right>
      <v-flex xs4 offset-xs8>
        <h1 class="display-3">Cras facilisis</h1>
        <span class="headline">mi vitae nunc lobortis pharetra</span>
      </v-flex>
    </v-container>
  </v-carousel-item>

  <v-carousel-item src="/static/hero/3.jpg" key=2>
    <v-container grid-list-xl text-xs-center>
      <v-flex xs4 offset-xs4>
        <h1 class="display-4 grey--text text--lighten-4">Cras facilisis mi vitae</h1>
        <span class="caption grey--text text--lighten-3">nunc lobortis pharetra</span>
      </v-flex>
    </v-container>
  </v-carousel-item>
</v-carousel>
</template>

<script>
export default {
  name: 'hero'
}
</script>

<style scoped>
</style>
