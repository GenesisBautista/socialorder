<template>
<v-card class="grey lighten-4">
    <v-form v-model="valid" ref="form" method="post" lazy-validation v-on:submit.prevent="login">
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12>
            <v-text-field
              name="email"
              label="Email Address"
              v-model="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              name="password"
              label="Password"
              v-model="password"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login" :disabled="!valid">Login</v-btn>
    </v-card-actions>
    <v-alert v-bind:color="alert.type" value="true" fixed>
          {{alert.msg}}
    </v-alert>
  </v-form>
</v-card>
</template>

<script>
import authService from '@/services/authService'

export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (x) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(x) || 'Email Invalid'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      alert: {
        type: 'info',
        msg: 'Get in here'
      }
    }
  },
  methods: {
    async login () {
      if (this.$refs.form.validate()) {
        try {
          var response = await authService.login({
            email: this.email,
            password: this.password
          })
          console.log(response)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push('/')
        } catch (error) {
          this.alert.type = 'error'
          console.log(error.response)
          this.alert.msg = error.response.data.error
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
