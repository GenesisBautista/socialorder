<template>
<v-card class="grey lighten-4 animate">
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
              :rules="emailRules"
              v-model="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              name="password"
              label="Password"
              v-model="password"
              :rules="passwordRules"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login" :disabled="!valid" type="submit">Login</v-btn>
      <v-btn color="primary" @click.native="dialog = false">Close</v-btn>
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
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push('/profile')
        } catch (error) {
          this.alert.type = 'error'
          this.alert.msg = error.response.data.error || 'Oops!'
        }
      }
    }
  }
}
</script>

<style scoped>
.animate{
  -webkit-transition: height 2s; /* Safari */
  transition: height 2s;
}
</style>
