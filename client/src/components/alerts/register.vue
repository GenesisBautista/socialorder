<template>
<v-card class="grey lighten-4">
  <v-form v-model="valid" ref="form" method="post" lazy-validation v-on:submit.prevent="register">
    <v-card-title>
      <span class="headline">Register New User</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12>
            <v-text-field
              name="username"
              label="Username"
              v-model="username"
              :rules="usernameRules"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              name="firstName"
              label="First Name"
              id="firstName"
              v-model="firstName"
              :rules="firstNameRules"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              name="lastName"
              label="Last Name"
              id="lastName"
              v-model="lastName"
              :rules="lastNameRules"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              name="email"
              label="Email Address"
              v-model="email"
              :rules="emailRules"
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
      <v-alert v-bind:color="alert.type" value="true">
        {{alert.msg}}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="register" :disabled="!valid" type="submit">Register</v-btn>
    </v-card-actions>
  </v-form>
</v-card>
</template>

<script>
import authService from '@/services/authService'

export default {
  data () {
    return {
      valid: true,
      username: '',
      usernameRules: [
        (v) => !!v || 'Username is required',
        (y) => y.length <= 30 || 'Username must be less than 30 characters',
        (y) => y.length >= 5 || 'Username must be longer than 5 characters',
        (x) => /^[A-Za-z0-9_@./#&+-]{5,30}$/.test(x) || 'Only letters numbers and these characters _./@#&+- allowed'
      ],
      firstName: '',
      firstNameRules: [
        (v) => !!v || 'First Name is required',
        (y) => y.length <= 20 || 'First name must be less than 20 characters'
      ],
      lastName: '',
      lastNameRules: [
        (v) => !!v || 'Last Name is required',
        (y) => y.length <= 20 || 'First name must be less than 20 characters'
      ],
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
        msg: 'Complete form to register'
      }
    }
  },
  methods: {
    async register () {
      if (this.$refs.form.validate()) {
        try {
          var response = await authService.register({
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.alert.type = 'success'
          this.alert.msg = 'Registration Successful'
        } catch (error) {
          this.alert.type = 'error'
          this.alert.msg = error.response.data.error
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
