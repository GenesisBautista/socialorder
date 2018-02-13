<template>
<v-content>
  <section>
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-layout row align-center justify-center>
            <v-flex xs12 md2>
              <v-avatar
                size='250px'
              >
                <img src='/static/emptyProfilePicture.jpg' alt='avatar'>
              </v-avatar>
            </v-flex>
            <v-flex xs12 md4 class='text-xs-center text-md-left'>
              <h1 class='display-3 capitalize'>{{user.firstName}} {{user.lastName}}</h1>
              <h1 class='headline'><v-icon>mail</v-icon> {{user.email}}</h1>
              <br />
              <h1 class='title'><v-icon>cake</v-icon> {{formatDate(user.joined)}}</h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 pt-5>
          <v-layout row align-center>
            <v-flex xs3>
              <v-card>
                <v-list two-line>
                  <v-list-tile @click="formatDate()">
                    <v-list-tile-avatar>
                      <v-icon class='grey lighten-1 white--text'>fa-facebook</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Facebook</v-list-tile-title>
                      <v-list-tile-sub-title>Last Posted: </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile @click="formatDate()">
                    <v-list-tile-avatar>
                      <v-icon class='grey lighten-1 white--text'>fa-twitter</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Twitter</v-list-tile-title>
                      <v-list-tile-sub-title>Last Posted: </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile @click="formatDate()">
                    <v-list-tile-avatar>
                      <v-icon class='grey lighten-1 white--text'>fa-instagram</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Instagram</v-list-tile-title>
                      <v-list-tile-sub-title>Last Posted: </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile @click="formatDate()">
                    <v-list-tile-avatar>
                      <v-icon class='grey lighten-1 white--text'>fa-youtube</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Youtube</v-list-tile-title>
                      <v-list-tile-sub-title>Last Posted: </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</v-content>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      user: this.$store.state.user
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    formatDate (input) {
      var date = new Date(input)
      var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]

      var day = date.getDay()
      var monthIndex = date.getMonth()
      var year = date.getFullYear()

      return day + ' ' + monthNames[monthIndex] + ' ' + year
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {

    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.capitalize{
  text-transform: capitalize;
}
</style>
