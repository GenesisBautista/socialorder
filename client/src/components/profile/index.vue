<template>
<v-content>
  <v-container fluid>
    <section>
      <v-container fluid>
        <v-layout>
          <v-flex xs12>
            <userCard :result="result" />
            <v-layout row align-center justify-center>
              <v-flex xs12>
                <router-link to='/profile/asdfasdf'>test 1</router-link>
                <router-link to='/profile/genesisab'>test 2</router-link>
                <router-link to='/profile/dabeginning'>test 3</router-link>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-container>
</v-content>
</template>

<script>
import userService from '@/services/user'
import {mapState} from 'vuex'
import userCard from './usercard.vue'

export default {
  name: 'Profile',
  components: {
    userCard
  },
  data () {
    return {
      result: {}
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
    async getUser () {
      var username = this.$route.params.username
      if (this.user.username === username) {
        this.result = this.user
      } else {
        this.result = (await userService.profile(username)).data
      }
    }
  },
  mounted () {
    this.getUser()
  },
  watch: {
    '$route' (to, from) {
      this.getUser()
    }
  }
}
</script>

<style scoped>
.capitalize{
  text-transform: capitalize;
}
</style>
