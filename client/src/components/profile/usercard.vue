<template>
<v-card>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs4>
        <v-avatar size="100px">
          <img src='/static/emptyProfilePicture.jpg' alt='avatar'>
        </v-avatar>
      </v-flex>
      <v-flex xs12 class='text-xs-left'>
        <div class='display-1'>{{result.username}}</div>
        <div class='title'><v-icon>cake</v-icon> {{formatDate(result.joined)}}</div>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
</template>

<script>
export default {
  props: [
    'result'
  ],
  methods: {
    formatDate (input) {
      var date = new Date(input)
      var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]
      var day = date.getDate()
      var monthIndex = date.getMonth()
      var year = date.getFullYear()
      return day + ' ' + monthNames[monthIndex] + ' ' + year
    }
  }
}
</script>

<style>

</style>
